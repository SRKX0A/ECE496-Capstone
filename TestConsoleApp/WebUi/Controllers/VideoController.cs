using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Text;
using WebUi.Scripts;

namespace Emerald.Controllers
{
    public class VideoController : ControllerBase
    {
        private RunPython _runPython;

        public VideoController()
        {
            _runPython = new RunPython();
        }

        [HttpPost("/api/EditVideo")]
        public async Task<IActionResult> EditVideo([FromForm] IFormFile file)
        {
            Console.WriteLine(System.IO.Directory.GetCurrentDirectory());
            string outputPath = $"{System.IO.Directory.GetCurrentDirectory()}\\FinalReact";
            string filePath = $"{System.IO.Directory.GetCurrentDirectory()}\\React";

            string timestampsPath = $"{System.IO.Directory.GetCurrentDirectory()}\\timestamps.txt";
            string trascriptPath = $"{System.IO.Directory.GetCurrentDirectory()}\\transcript.txt";
            string finalName = "FinalVid";

            Console.WriteLine("Creating And Saving Video");
            try
            {
                string name = file.FileName;
                string extension = Path.GetExtension(file.FileName);
                

                outputPath = outputPath + extension;
                filePath = filePath + extension;
                finalName = finalName + extension;
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


            Console.WriteLine("Running Python Script");
            try
            {

                await _runPython.Run(filePath, outputPath);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            Console.WriteLine("Getting OutputVideo");
            byte[] bytes;
            string timestamps;
            string transcript;
            List<TimeStamp> TimeStamps = new List<TimeStamp>();
            try
            {
                using (var filestream = System.IO.File.OpenRead($"{outputPath}"))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await filestream.CopyToAsync(memoryStream);
                        bytes = memoryStream.ToArray();
                    }
                }


                using (StreamReader streamReader = new StreamReader(trascriptPath, Encoding.UTF8))
                {
                    transcript = streamReader.ReadToEnd();
                }
                transcript = transcript.Replace("|", " ");
                transcript = System.Threading.Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(transcript.ToLower());
                using (StreamReader streamReader = new StreamReader(timestampsPath, Encoding.UTF8))
                {
                    timestamps = streamReader.ReadToEnd();
                }

                var timeStampItems = timestamps.Split("\r\n");
                foreach(var item in timeStampItems)
                {
                    if (item == "")
                        continue;
                    var split = item.Split(" ");
                    if (split.Length != 4)
                        continue;

                    TimeStamp temp = new TimeStamp { 
                        Word = split[0], 
                        Confidence = Math.Round(double.Parse(split[1]), 3), 
                        StartTime = Math.Round(double.Parse(split[2]), 3), 
                        EndTime = Math.Round(double.Parse(split[3]), 3)
                   };

                    temp.Duration = Math.Round(temp.EndTime - temp.StartTime, 3);
                    TimeStamps.Add(temp);
                }
                

                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
                if (System.IO.File.Exists(outputPath))
                    System.IO.File.Delete(outputPath);

                if (System.IO.File.Exists(trascriptPath))
                    System.IO.File.Delete(trascriptPath);
                if (System.IO.File.Exists(timestampsPath))
                    System.IO.File.Delete(timestampsPath);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new ReturnObject { Bytes = bytes, Name = finalName, Type = file.ContentType , TimeStamps = timestamps, Transcript= transcript
            , TimeStampList = TimeStamps});
        }

        [HttpGet("/api/GetVideo/{outputPath}")]
        public async Task<IActionResult> GetOuputVideo([FromRoute] string outputPath)
        {
            var filestream = System.IO.File.OpenRead($"C:\\Users\\abdul\\Desktop\\Capstone\\TestFolder\\{outputPath}");
            var contentType = "." + outputPath.Split(".").Last();
            var contentFormat = "video/mp4";
            if (contentType == ".wav")
                contentFormat = "audio/wav";

            return File(filestream, contentType: contentFormat, fileDownloadName: outputPath, enableRangeProcessing: true);
        }
    }

    public class Transcripts
    {
        public string OldTranscripts { get; set; }

        public string NewTranscripts { get; set; }
    }

    public class ReturnObject
    {
        public byte[] Bytes { get; set; }

        public string Type { get; set; }

        public string Name { get; set; }    

        public string Transcript { get; set; }

        public string TimeStamps { get; set; }

        public List<TimeStamp> TimeStampList { get; set; }
    }

    public class TimeStamp
    {
        public string Word { get; set; }

        public double Confidence { get; set; }

        public double StartTime { get; set; }

        public double EndTime { get; set; }

        public double Duration { get; set; }
    }



}
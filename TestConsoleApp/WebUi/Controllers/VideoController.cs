using Microsoft.AspNetCore.Mvc;
using System;
using System.Runtime.CompilerServices;
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
            Console.WriteLine("Hello");
            string outputPath = $"C:\\Capstone\\FinalReact";
            string filePath = $"C:\\Capstone\\React";
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

                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
                if (System.IO.File.Exists(outputPath))
                    System.IO.File.Delete(outputPath);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new ReturnObject { Bytes = bytes, Name = finalName, Type = file.ContentType });
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
    }


}
using Microsoft.AspNetCore.Mvc;
using System;
using System.Runtime.CompilerServices;

namespace Emerald.Controllers
{
    public class VideoController : ControllerBase
    {
        private string inputPath = "C:\\Capstone\\TestVideo.mp4";

        public VideoController()
        {
        }

        [HttpGet("/api/GetTranscript")]
        public async Task<IActionResult> GetTranscript()
        {
            Console.WriteLine("Hello");

            
            return Ok();
        }
    }

    public class Transcripts
    {
        public string OldTranscripts { get; set; }

        public string NewTranscripts { get; set; }
    }
}
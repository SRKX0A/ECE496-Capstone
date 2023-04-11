﻿using System;
using System.Diagnostics;

namespace WebUi.Scripts
{
    public class RunPython
    {
        public async Task Run(string inputPath, string outputPath)
        {
            
            var startingPath = @"C:\Users\abdul\source\repos\SRKX0A\ECE496-Capstone\src\cli\main.py";
            var pythonPath = @"C:\Users\abdul\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.7_qbz5n2kfra8p0\python3.7.exe";


            using (Process p = new Process())
            {
                System.Diagnostics.ProcessStartInfo start = new System.Diagnostics.ProcessStartInfo();
                start.FileName = pythonPath;

                start.Arguments = string.Format("{0} -i {1} -o {2}", startingPath, inputPath, outputPath);
                start.UseShellExecute = false;// Do not use OS shell
                start.CreateNoWindow = true; // We don't need new window
                start.RedirectStandardOutput = true;// Any output, generated by application will be redirected back
                start.RedirectStandardError = true; // Any error in standard output will be redirected back (for example exceptions)

                p.StartInfo = start;



                p.Start();
                //string output = p.StandardOutput.ReadToEnd();
                //string error = p.StandardError.ReadToEnd();
                //p.WaitForExit();


                var stdErr = p.StandardError;
                var stdOut = p.StandardOutput;

                var resultAwaiter = stdOut.ReadToEndAsync();
                var errResultAwaiter = stdErr.ReadToEndAsync();

                await p.WaitForExitAsync();

                await Task.WhenAll(resultAwaiter, errResultAwaiter);

                var result = resultAwaiter.Result;
                var errResult = errResultAwaiter.Result;

                Console.WriteLine("Output: " + result);
                Console.WriteLine("Error: " + errResult);

            }
        }
    }
}

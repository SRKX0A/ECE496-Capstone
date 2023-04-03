import click
from tqdm import tqdm

from pipeline_stages import audio_extraction as stage1
from pipeline_stages import transcription_generation as stage2
from pipeline_stages import timestamp_identification as stage3

DEPTH ={
  "e": "EXTRACT_AUDIO",
  "g": "GENERATE_TIMESTAMSP",
  "i" : "IDENTIFY_TIMESTAMPS",
  "f" : "FULL",
}

@click.command()
@click.option("--input","-i",nargs=1,prompt = "Input file path",type = click.Path(exists=True),help = "Input file name")
@click.option("--output","-o", nargs=1, prompt = "Output file path",type = click.Path(exists=False), help = "Output folder")
@click.option("--chunk","-c",type = int, show_default = True, default = 20, help = "Audio chunk size")
@click.option("--depth","-d", show_default = True, default = "f",type = click.Choice(DEPTH.keys()), help= "Pipeline depth")
def main(input,output,chunk,depth):

    # put cli code here, some relevant options to capture below
    #print(type(input))	
    video_filename = input
    # output_filename = output
    audio_chunk_size = chunk
    run_pipeline_depth = DEPTH[depth]  # allowed values: EXTRACT_AUDIO, GENERATE_TRANSCRIPT, IDENTIFY_TIMESTAMPS, FULL
    
    run_pipeline(video_filename, audio_chunk_size=audio_chunk_size, run_pipeline_depth=run_pipeline_depth)


def run_pipeline(video_filename, output_filename=None, audio_chunk_size=20, run_pipeline_depth="FULL"):

    if run_pipeline_depth != "EXTRACT_AUDIO":
        offset_paths = stage1.extract(video_filename, audio_chunk_size=audio_chunk_size)
    else:
        offset_paths = stage1.extract(video_filename, no_split=True, output_filename=output_filename)
        print(f"Output audio file has been written to {offset_paths[0] if output_filename is None else output_filename}")
        return

    transcript_and_emissions = []
    for offset, path in tqdm(offset_paths, desc="Generating transcripts and extracting acoustic features"):
        transcript, emissions, waveform_size = stage2.generate(path)
        transcript_and_emissions.append((transcript, emissions, waveform_size, path, offset))

    #if run_pipeline_depth == "GENERATE_TRANSCRIPT":
    with open("transcript.txt", "w") as f:
        for transcript, *_ in transcript_and_emissions:
            f.write(transcript)
    #    return

    timestamps = []

    for transcript, emissions, waveform_size, path, offset in tqdm(transcript_and_emissions, desc="Identifying timestamps of filler words"):
        words = stage3.identify(path, transcript, audio_offset=offset, label_probabilities=emissions, waveform_size=waveform_size)
        timestamps.extend(words)

    #if run_pipeline_depth == "IDENTIFY_TIMESTAMPS":
    with open("timestamps.txt", "w") as f:
        for timestamp in timestamps:
            f.write(f"{timestamp.label} {timestamp.score} {timestamp.start} {timestamp.end}\n")
    #    return

    #from datetime import timedelta
    #import moviepy.editor as mvpe
    #clip = mvpe.VideoFileClip("../test_file.mp4")

    #for timestamp in timestamps:
    #    ta = str(timedelta(seconds=(timestamp.start - 0.15)))
    #    tb = str(timedelta(seconds=(timestamp.end + 0.15)))
    #    clip = clip.cutout(ta, tb)

    #clip.write_videofile(filename="../test_file_edited.mp4")


if __name__ == "__main__":
    main()

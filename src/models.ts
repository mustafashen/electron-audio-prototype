import { AudioPipelineInputs, AutomaticSpeechRecognitionPipelineType, PipelineType, TextClassificationPipelineType } from '@xenova/transformers';

class AutomaticSpeechRecognitionPipeline {
  static task: PipelineType = "automatic-speech-recognition";
  static model = 'whisper-tiny';
  static instance: Promise<AutomaticSpeechRecognitionPipelineType> = null;

  static async getInstance(progress_callback: any = null) {
    if (this.instance === null) {
      const {pipeline, env} = await import('@xenova/transformers');

      this.instance = pipeline(this.task, this.model, { progress_callback }) as Promise<AutomaticSpeechRecognitionPipelineType>
    }

    return this.instance;
  }
}

async function runAutomaticSpeechRecognition(event: unknown, audio: AudioPipelineInputs) {
  const recognizer = await AutomaticSpeechRecognitionPipeline.getInstance();
  return await recognizer(audio)
}

class TextClassificationPipeline {
  static task: PipelineType = "text-classification";
  static model = 'emotion-english-distilroberta-base';
  static instance: Promise<TextClassificationPipelineType> = null;

  static async getInstance(progress_callback: any = null) {
    if (this.instance === null) {
      const {pipeline, env} = await import('@xenova/transformers');

      this.instance = pipeline(this.task, this.model, { progress_callback }) as Promise<TextClassificationPipelineType>
    }

    return this.instance;
  }
}

async function runTextClassificationPipeline(event: unknown, text: string) {
  const classifier = await TextClassificationPipeline.getInstance();
  return await classifier(text)
}

module.exports = {
  runAutomaticSpeechRecognition,
  runTextClassificationPipeline
}
import { Param } from '@discord-nestjs/core';

export class SoragodungDto {
  @Param({
    name: '선택지',
    description: '선택지를 띄어쓰기로 구분해서 입력해 주세요.',
    required: true,
  })
  choices: string;
}

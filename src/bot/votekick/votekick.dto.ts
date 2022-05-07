import { Param, ParamType } from '@discord-nestjs/core';

export class VotekickDto {
  @Param({
    name: '대상',
    description: '잠수 채널로 보내고 싶은 사람을 선택해 주세요.',
    required: true,
    type: ParamType.USER,
  })
  target: string;
}

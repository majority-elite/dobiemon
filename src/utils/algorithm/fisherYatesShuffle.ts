/**
 * Fisher-Yates Shuffle 알고리즘을 구현한 랜덤 섞기 알고리즘
 * * 웬만하면 깊은 복사가 된 배열을 parameter로 사용하는 게 좋다.
 * @param arr 섞고 싶은 배열
 * @returns 랜덤하게 섞인 배열
 */
export function fisherYatesShuffle(arr: any[]) {
  const strikeOut = [];

  while (arr.length) {
    const lastIndex = arr.length - 1;
    const roll = Math.floor(Math.random() * arr.length);
    const temp = arr[lastIndex];

    arr[lastIndex] = arr[roll];
    arr[roll] = temp;
    strikeOut.push(arr.pop());
  }

  return strikeOut;
}

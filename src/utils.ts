import { TRACK_POINTS } from './constants';

export function getAbsolutePosition(spaceIndex: number, rotationIndex: number): [number, number] {
  const clampedIndex = Math.max(0, Math.min(spaceIndex, TRACK_POINTS.length - 1));
  const [x, y] = TRACK_POINTS[clampedIndex];
  const px = x - 50;
  const py = y - 50;
  let rx = px, ry = py;
  if (rotationIndex === 1) { // 90 CW
    rx = -py; ry = px;
  } else if (rotationIndex === 2) { // 180
    rx = -px; ry = -py;
  } else if (rotationIndex === 3) { // 270 CW
    rx = py; ry = -px;
  }
  return [rx + 50, ry + 50];
}

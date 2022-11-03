import _ from 'lodash';
import { getSavedImageData } from '../data/savedImages';

export const wait = (timeout: number) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const array = new Array(800).fill(0);
const generateImageArray = array.map((v, i) => {
  return {
    id: i + 1,
    src: `https://picsum.photos/id/${i + 1}/300/400`,
  };
});

export const imageArray = _.shuffle(generateImageArray);

export const reshuffle = () => {
  const newImageArray = _.shuffle(imageArray);
  return newImageArray;
};

export const getSavedImage = async () => {
  const savedImageArr = await getSavedImageData();
  return savedImageArr;
};

export default imageArray;

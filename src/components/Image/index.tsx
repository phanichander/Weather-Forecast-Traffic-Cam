import { Image as ImageD } from 'antd';

interface Props {
  source: string
}

const Image = ({ source }: Props) => (
  <ImageD
    height='240px'
    src={source}
  />
);

export default Image;
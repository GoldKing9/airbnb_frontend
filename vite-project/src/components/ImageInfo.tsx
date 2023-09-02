import styled from 'styled-components';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface ImageInfoProps {
  showImages: string[];
  setShowImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageInfo: React.FC<ImageInfoProps> = ({showImages, setShowImages }) => {
  
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const imageLists: FileList | null = e.target.files;

    let imageUrlLists = [...showImages];


    if (imageLists !== null) {
      for(let i=0; i<imageLists.length; i++) {
        const currentImageUrl: string = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
  
      if(imageUrlLists.length > 12) {
        imageUrlLists = imageUrlLists.slice(0, 12);
        alert("사진은 최대 12장까지만 등록할 수 있습니다.")
      }
  
      setShowImages(imageUrlLists);
    }
  }
    

  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id ))
  };

  return (
    <>
      <ImageH2>이미지 등록</ImageH2>
      <ImageDiv>
        <ImageGrid>
          {showImages.map((image, id) => (
            <ImageCheckDiv key={id}>
              <ImageImg src={image} alt={`${image}-${id}`} width={100} height={100}/>
              <DeleteButton onClick= {() => handleDeleteImage(id)}>
                <XFontAwesomeIcon icon={faX}/>
              </DeleteButton>          
            </ImageCheckDiv>
          ))}
        </ImageGrid>
        <ImageLabel
          htmlFor='input-file-label'
        >
          <ImageLoader 
            type='file'
            multiple={true}
            id='input-file-label'
            style={{display: 'none'}}
            accept='image/*'
            onChange={handleAddImages}
          />
           <BoardClickDiv>이미지를 업로드 하려면 이곳을 클릭해주세요!</BoardClickDiv>   
        </ImageLabel>
      </ImageDiv> 
    </>
  );
};

export default ImageInfo;

const ImageH2 = styled.h2`
  width: 80px;
  height:30px;
  font-size: 16px;
  margin-left: 25px;
  margin-top: 25px;
`

const ImageDiv = styled.div`
  width: 420px;
  height: 300px;
  border: 1px #ebebeb solid;
  margin: 0 auto;
  border-radius: 15px;
`

const ImageLabel = styled.label`
  width: 420px;
  height: 100px;
  font-weight: bolder;
`

const ImageLoader = styled.input`
  width: 420px;
  height: 100px;
`

const BoardClickDiv = styled.div`
  width: 100%;
  height: 100px;
  font-size: 16px;
  line-height: 30px;
  color: gray;
  line-height: 100px;
  border: 1px #ebebeb solid;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  width: 14px;
  height: 14px;
  background-color: #fc335a;
  color: white;
  font-weight: bolder;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  cursor: pointer;
  line-height: 14px;
`
const ImageCheckDiv = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  position: relative;
`

const ImageImg = styled.img`
`;

const ImageGrid = styled.div`
  witdth: 420px;
  height: 310px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 4px;
`

const XFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
`;
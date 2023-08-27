import React, {useState} from 'react';
import styled from 'styled-components';
import Slider from 'react-slider';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const fetchSearchResults = async (query: string) => {
    try {
        const response = await fetch(query);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const PriceRange = styled.div`
  margin-top: 10px;
  font-size: 14px;
  text-align: left;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 80%;
  background-color: white;
  border-radius: 10px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #000000;
`;


const StyledSliderContainer = styled.div`
  padding: 0 20px; // 양쪽에 20px 패딩 추가
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 25px;

  .thumb {
    height: 25px;
    width: 25px;
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 50%;
    cursor: pointer;
  }

  .track {
    top: 12px;
    background: #333;
    height: 1px;
  }
`;

const AdjustButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
`;

type NumberButtonProps = {
    selected: boolean;
};

const NumberButton = styled.button<NumberButtonProps>`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: ${props => props.selected ? '#333' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#333'};
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
`;

const SearchModal: React.FC<{ isOpen: boolean, setIsOpen: (open: boolean) => void }> = ({isOpen, setIsOpen}) => {
    const [price, setPrice] = useState<[number, number]>([0, 1000]);
    const [address, setAddress] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState<number>(1);
    const [beds, setBeds] = useState<number>(1);
    const [bathrooms, setBathrooms] = useState<number>(1);
    const [rooms, setRooms] = useState<number>(1);

    const handleSearch = () => {
        const baseURL = "http://3.39.233.168:8080/api/accommodation/search";
        const query = `${baseURL}?page=1&size=10&mainAddress=${address}&checkIn=${startDate?.toISOString().split('T')[0]}&checkOut=${endDate?.toISOString().split('T')[0]}&minPrice=${price[0]}&maxPrice=${price[1]}&bedroom=${rooms}&bathroom=${bathrooms}&bed=${beds}&guest=${guests}`;
        fetchSearchResults(query);
    };

    return isOpen ? (
        <Overlay onClick={() => setIsOpen(false)}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <CloseButton onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faTimes}/> {/* X 문자 대신 아이콘 사용 */}
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <InputContainer>
                        <StyledSliderContainer>
                            <StyledSlider
                                value={price}
                                onChange={value => setPrice(value as [number, number])}
                                min={0}
                                max={1000}
                            />
                        </StyledSliderContainer>
                        <PriceRange>{`₩${price[0]} - ₩${price[1]}`}</PriceRange>
                    </InputContainer>
                    <LabelContainer>
                        <label>주소:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </LabelContainer>
                    <LabelContainer>
                        <label>머물 수 있는 날짜:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </LabelContainer>
                    <LabelContainer>
                        <label>인원 수:</label>
                        <AdjustButton onClick={() => setGuests(prev => Math.max(1, prev - 1))}>-</AdjustButton>
                        {guests}
                        <AdjustButton onClick={() => setGuests(prev => Math.min(10, prev + 1))}>+</AdjustButton>
                    </LabelContainer>
                    <LabelContainer>
                        <label>침대 개수:</label>
                        {[...Array(11)].map((_, idx) => (
                            <NumberButton
                                key={idx}
                                onClick={() => setBeds(idx)}
                                selected={beds === idx}
                            >
                                {idx}
                            </NumberButton>
                        ))}
                    </LabelContainer>
                    <LabelContainer>
                        <label>욕실 개수:</label>
                        {[...Array(11)].map((_, idx) => (
                            <NumberButton
                                key={idx}
                                onClick={() => setBathrooms(idx)}
                                selected={bathrooms === idx}
                            >
                                {idx}
                            </NumberButton>
                        ))}
                    </LabelContainer>
                    <LabelContainer>
                        <label>방 개수:</label>
                        {[...Array(11)].map((_, idx) => (
                            <NumberButton
                                key={idx}
                                onClick={() => setRooms(idx)}
                                selected={rooms === idx}
                            >
                                {idx}
                            </NumberButton>
                        ))}
                    </LabelContainer>
                    <button onClick={handleSearch}>검색</button>
                </ModalBody>
            </ModalContainer>
        </Overlay>

    ) : null;
};

export default SearchModal;

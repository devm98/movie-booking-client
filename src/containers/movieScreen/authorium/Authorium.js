import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import actions from '../../../state/actions/booking';
import Row from './components/Row';
import { dataRoomSelector, seatsBookedSelector } from './selector';

function Authorium(props) {
  const dispatch = useDispatch();
  const dataRoom = useSelector(dataRoomSelector);
  const seatsBooked = useSelector(seatsBookedSelector);
  const { id } = useParams();
  const { showingScheduleId, seats } = dataRoom;

  useEffect(() => {
    dispatch(
      actions.getSeatsBooked({
        showingScheduleId,
        movieId: id,
      })
    );
  }, [dispatch, id, showingScheduleId]);

  console.log(seatsBooked, seats);

  return (
    <Container>
      {Object.keys(seats).map((key, index) => {
        const seat = seats[key];
        return (
          <div key={index}>
            <span>{key}</span> <Row searArr={seat} />
          </div>
        );
      })}
    </Container>
  );
}

export default Authorium;

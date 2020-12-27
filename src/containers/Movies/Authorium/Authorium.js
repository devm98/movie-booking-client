import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import actions from '../../../state/actions/booking';
import Row from './components/Row';

function Authorium(props) {
  const dispatch = useDispatch();
  const dataRoom = useSelector((state) => state.schedule.dataRoom);
  const { id } = useParams();
  const { showingScheduleId, seats } = dataRoom;

  console.log(seats);

  useEffect(() => {
    dispatch(
      actions.getSeatsBooked({
        showingScheduleId,
        movieId: id,
      })
    );
  }, [dispatch, id, showingScheduleId]);

  return (
    <Container>
      <Row />
      <Row />
      <Row />
    </Container>
  );
}

export default Authorium;

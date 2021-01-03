import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import movieActions from '../../state/actions/movies';
import bookingActions from '../../state/actions/booking';
import { getMovieDetails } from '../../core/api/movies';
import {
  scheduleSelector,
  dataRoomSelector,
  seatsBookedSelector,
  showingScheduleIdSelector,
} from './selectors';
import { GetDates } from '../../core/helpers';

const { getComingSoonMovies, getNowShowingMovies } = movieActions;
const { getRooms, getMovieSchedule, getSeatsBooked } = bookingActions;

const useEnhance = () => {
  const [dated, setDated] = useState(GetDates(7)[0].dateKey);
  const [movie, setMovie] = useState({});
  const [seatBookings, setSeatBookings] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const schedules = useSelector(scheduleSelector);
  const dataRoom = useSelector(dataRoomSelector);
  const seatsBooked = useSelector(seatsBookedSelector);
  const showingScheduleId = useSelector(showingScheduleIdSelector);

  const dispatch = useDispatch();
  const comingSoon = useSelector((state) => state.movies.comingSoon.data);
  const nowShowing = useSelector((state) => state?.movies?.nowShowing?.data);

  const handleShowMovieDetail = (movieId) => {
    getMovieDetails(movieId)
      .then((res) => {
        setMovie(res.data);
        if (res.status === 200) {
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
    setVisible(true);
  };

  const onChangeSchedule = (data) => {
    const showingDate = `${dated} ${data.timeSchedule}:00`;
    dispatch(
      getRooms({
        movieId: movie?.data?.id,
        showingDate,
      })
    );
  };

  const handleSelectedSchedule = (key, movieId) => {
    setDated(key);
    dispatch(getMovieSchedule({ date: key, type: '0', movieId }));
  };

  const handleCancel = () => {
    setVisible(false);
    setLoading(true);
  };

  const next = () => {
    dispatch(
      getMovieSchedule({
        date: GetDates(7)[0].dateKey,
        type: '0',
        movieId: movie?.data?.id,
      })
    );
    const nextCurrent = current + 1;
    setCurrent(nextCurrent);
  };

  const handleBooking = (movieId) => {
    dispatch(
      getSeatsBooked({
        showingScheduleId,
        movieId,
      })
    );
  };

  const prev = () => {
    const prevCurrent = current - 1;
    setCurrent(prevCurrent);
  };

  const handleBookingSeat = (e) => {
    const { checked, name } = e.target;
    setSeatBookings({ ...seatBookings, [name]: checked });
  };

  useEffect(() => {
    dispatch(getNowShowingMovies());
    dispatch(getComingSoonMovies());
  }, []);

  return {
    movie,
    current,
    comingSoon,
    nowShowing,
    schedules,
    visible,
    loading,
    dataRoom,
    seatsBooked,
    seatBookings,
    handleShowMovieDetail,
    onChangeSchedule,
    handleSelectedSchedule,
    handleCancel,
    next,
    prev,
    handleBooking,
    handleBookingSeat,
  };
};

export default useEnhance;

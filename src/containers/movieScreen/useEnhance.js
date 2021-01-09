import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import movieActions from '../../state/actions/movies';
import bookingActions from '../../state/actions/booking';
import { getMovieDetails } from '../../core/api/movies';
import {
  scheduleSelector,
  dataRoomSelector,
  seatsBookedSelector,
} from './selectors';
import { GetDates } from '../../core/helpers';

const { getComingSoonMovies, getNowShowingMovies } = movieActions;
const { getRooms, getMovieSchedule, getSeatsBooked } = bookingActions;
const arrDay = GetDates(7);

const useEnhance = () => {
  const [dated, setDated] = useState(arrDay[0].dateKey);
  const [movie, setMovie] = useState({});
  const [seatBookings, setSeatBookings] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [current, setCurrent] = useState(0);
  const schedules = useSelector(scheduleSelector);
  const dataRoom = useSelector(dataRoomSelector);
  const seatsBooked = useSelector(seatsBookedSelector);
  const { showingScheduleId } = dataRoom;

  const dispatch = useDispatch();
  const comingSoon = useSelector((state) => state.movies.comingSoon.data);
  const nowShowing = useSelector((state) => state?.movies?.nowShowing?.data);

  const handleShowMovieDetail = (movieId) => {
    setCurrent(0);
    setLoadingDetail(true);
    getMovieDetails(movieId)
      .then((res) => {
        setMovie(res.data);
        if (res.status === 200) {
          setLoadingDetail(false);
        }
      })
      .catch((e) => console.log(e));
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

  const next = () => {
    dispatch(
      getMovieSchedule({
        date: arrDay[0].dateKey,
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

  const handleTabClick = (key, e) => {
    if (key === '1') dispatch(getNowShowingMovies());
    if (key === '2') dispatch(getComingSoonMovies());
  };

  useEffect(() => {
    dispatch(getNowShowingMovies());
  }, [dispatch]);

  return {
    movie,
    current,
    comingSoon,
    nowShowing,
    schedules,
    loadingDetail,
    dataRoom,
    seatsBooked,
    seatBookings,
    handleShowMovieDetail,
    onChangeSchedule,
    handleSelectedSchedule,
    next,
    prev,
    handleBooking,
    handleBookingSeat,
    handleTabClick,
  };
};

export default useEnhance;

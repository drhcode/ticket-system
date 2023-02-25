import { useParams, userParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ticketID = useParams();

  useEffect(() => {
    if (isError) {
      swal(message);
    }
    dispatch(getTicket(ticketID));
  }, [isError, message, ticketID]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketID));
    swal({
      title: 'Ticket Closed',
      icon: 'success'
    });
    navigate('/tickets');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url="/tickets" />
          <h2>
            Ticket Id: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        {ticket.status !== 'Closed' && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
};

export default Ticket;

import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dateFnsFormat from 'date-fns/format';

import { getEventDetail } from '../api/events';
import { EventType } from '../model/Event';
import { COLOR } from '../constants/colors';
import { SCREEN } from '../constants';
import { EventCardButton } from '../components/EventCardButton';
import { UserContext } from '../App';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const EventHash = styled.span`
  width: 80%;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${COLOR.BRILLIANT_SILVER};
  margin: 50px 0px 50px 0px;
`;

const EventDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;

  @media (min-width: ${SCREEN.LAPTOP}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 80%;
  }
`;

const EventBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  width: 100%;
  height: 296px;
  margin: 15px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.108696);
  border-radius: 2px;
  background-color: ${COLOR.WHITE};
  background-size: cover;
  transition: all 450ms ease-out 0s;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.85);
  }

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 60%;
    margin: 0px 15px 0px 0px;
  }
`;

const EventDescription = styled.div`
  display: inline-block;
  margin: 15px 25px 15px 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color: ${COLOR.FRILLED_SHARK};
`;

const EventTitle = styled.span`
  margin: 10px 25px 0px 25px;
  width: 100%;
  font-size: 22px;
  color: ${COLOR.BIG_STONE};
`;

const EventOwner = styled.div`
  margin: 5px 25px 10px 25px;
  width: 100%;
  color: ${COLOR.OCEAN_FRIGATE};
  font-size: smaller;
`;

const EventDate = styled.div`
  margin: 10px 25px 10px 25px;
  width: 100%;
  color: ${COLOR.LUNAR_RAYS};
  font-size: smaller;
`;

const EventCapacity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 10px 25px 10px 25px;
  width: 100%;
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: ${COLOR.FRILLED_SHARK};
  margin-right: 5px;
`;

const CapacityContainer = styled.div`
  align-self: center;
  display: flex;
`;

const AttendeeBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  width: 100%;
  height: 296px;
  padding: 25px;
  margin: 15px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.108696);
  border-radius: 2px;
  background-color: ${COLOR.WHITE};
  background-size: cover;
  transition: all 450ms ease-out 0s;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.85);
  }

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 40%;
    margin: 0px;
  }
`;

const AttendeeTitle = styled.span`
  margin: 10px 25px 20px 25px;
  width: 100%;
  font-size: 22px;
  color: ${COLOR.BIG_STONE};
`;

const AtendeeContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Attendee = styled.div`
  height: 30px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
  font-size: 13px;
  background-color: ${COLOR.BIG_FISH_TO_FRY};
  color: ${COLOR.FRILLED_SHARK};
  border-radius: 15px;
  padding: 0px 15px 0px 15px;
  margin: 5px 5px 5px 5px;
`;

const Detail = () => {
  const location = useLocation();
  const { eventId } = location.state;
  const [eventDetail, setEventDetail] = useState<EventType>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getEvent = async () => {
      setEventDetail(await getEventDetail(eventId));
    };

    getEvent();
  }, []);

  return (
    <>
      <DetailContainer>
        <Link to="/">
          <ArrowIcon icon={faArrowLeft} />
          Back to events
        </Link>
        {eventDetail && (
          <>
            <EventHash>Detail Event: #{eventDetail.id}</EventHash>

            <EventDetailContainer>
              <EventBox>
                <EventDate>
                  {dateFnsFormat(
                    new Date(eventDetail.startsAt),
                    'LLLL d, y - p',
                  )}
                </EventDate>
                <EventTitle>{eventDetail.title}</EventTitle>
                <EventOwner>
                  {eventDetail.owner.firstName} {eventDetail.owner.lastName}
                </EventOwner>
                <EventDescription>{eventDetail.description}</EventDescription>
                <EventCapacity>
                  <CapacityContainer>
                    <UserIcon icon={faUser} />
                    {eventDetail.attendees.length} of {eventDetail.capacity}
                  </CapacityContainer>
                  <EventCardButton
                    ownerId={eventDetail.owner.id}
                    userId={user.id}
                    attendees={eventDetail.attendees}
                    eventId={eventDetail.id}
                  />
                </EventCapacity>
              </EventBox>

              <AttendeeBox>
                <AttendeeTitle>Attendees</AttendeeTitle>
                <AtendeeContent>
                  {eventDetail.attendees.map(({ firstName, lastName, id }) => (
                    <Attendee key={id}>
                      {firstName} {lastName}
                    </Attendee>
                  ))}
                </AtendeeContent>
              </AttendeeBox>
            </EventDetailContainer>
          </>
        )}
      </DetailContainer>
    </>
  );
};

export default Detail;

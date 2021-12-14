import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import dateFnsFormat from 'date-fns/format';

import { EventType } from '../model/Event';
import { SCREEN } from '../constants';
import { UserContext } from '../App';
import { EventCardButton } from './EventCardButton';
import { COLOR } from '../constants/colors';

const ContainerBoxes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  @media (min-width: ${SCREEN.LAPTOP}) {
    display: grid;
    grid-template-columns: 400px 400px 400px;
    grid-template-rows: 300px auto;
    column-gap: 10px;
    row-gap: 15px;
    justify-content: center;
  }
`;

const Boxes = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  width: 390px;
  height: 296px;
  border-radius: 2px;
  background-color: ${COLOR.WHITE};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.108696);
  transition: box-shadow 450ms ease-out;
  margin: 10px;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: ${SCREEN.LAPTOP}) {
    margin: 0px;
  }
`;

const EventDate = styled.div`
  margin: 10px 25px 10px 25px;
  width: 100%;
  color: ${COLOR.LUNAR_RAYS};
  font-size: 14px;
  line-height: 24px;
`;

const EventTitle = styled.h1`
  margin: 10px 25px 5px 25px;
  width: 100%;
  font-size: 22px;
  color: ${COLOR.BIG_STONE};
`;

const EventOwner = styled.div`
  margin: 5px 25px 10px 25px;
  width: 100%;
  color: ${COLOR.OCEAN_FRIGATE};
  font-size: 14px;
`;

const EventDescription = styled.div`
  width: 100%;
  margin: 15px 25px 15px 25px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR.FRILLED_SHARK};
`;

const EventCapacity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 10px 25px 10px 25px;
  width: 100%;
  font-size: 14px;
  line-height: 24px;
  color: ${COLOR.FRILLED_SHARK};
`;

const CapacityContainer = styled.div`
  align-self: center;
  display: flex;
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: ${COLOR.FRILLED_SHARK};
  margin-right: 5px;
  width: 16px;
  height: 16px;
`;

type DashboardBoxesProps = {
  events?: EventType[];
  getEvents: () => Promise<void>;
};

export const DashboardBoxes: React.FC<DashboardBoxesProps> = ({
  events,
  getEvents,
}) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <ContainerBoxes>
        {events?.map(
          ({
            id,
            startsAt,
            title,
            owner,
            description,
            attendees,
            capacity,
          }) => (
            <Link to="/detail/" state={{ eventId: id }} key={id}>
              <Boxes>
                <EventDate>
                  {dateFnsFormat(new Date(startsAt), 'LLLL d, y - p')}
                </EventDate>
                <EventTitle>{title}</EventTitle>
                <EventOwner>
                  {owner.firstName} {owner.lastName}
                </EventOwner>
                <EventDescription>{description}</EventDescription>
                <EventCapacity>
                  <CapacityContainer>
                    <UserIcon icon={faUser} />
                    {attendees.length} of {capacity}
                  </CapacityContainer>

                  <EventCardButton
                    ownerId={owner.id}
                    userId={user.id}
                    attendees={attendees}
                    eventId={id}
                    getEvents={getEvents}
                  />
                </EventCapacity>
              </Boxes>
            </Link>
          ),
        )}
      </ContainerBoxes>
    </>
  );
};

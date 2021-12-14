import styled from 'styled-components';
import dateFnsFormat from 'date-fns/format';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { EventType } from '../model/Event';
import { UserContext } from '../App';
import { SCREEN } from '../constants';
import { EventCardButton } from './EventCardButton';
import { COLOR } from '../constants/colors';

const ContainerBoxes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const CustomLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boxes = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  height: 136px;
  margin: 10px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.108696);
  border-radius: 2px;
  background-color: ${COLOR.WHITE};
  transition: box-shadow 450ms ease-out;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.85);
  }

  @media (min-width: ${SCREEN.LAPTOP}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 72px;
  }
`;

const EventTitle = styled.div`
  font-size: 18px;
  color: ${COLOR.BIG_STONE};
  margin: 5px 25px 0px 25px;

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 20%;
    margin: 15px 25px 15px 25px;
  }
`;

const EventDescription = styled.div`
  display: inline-block;
  width: 80%;
  margin: 0px 25px 0px 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: ${COLOR.FRILLED_SHARK};

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 20%;
    margin: 15px 25px 15px 25px;
  }
`;

const EventOwner = styled.div`
  display: none;

  @media (min-width: ${SCREEN.LAPTOP}) {
    display: block;
    width: 10%;
    margin: 15px 25px 15px 25px;
    color: ${COLOR.OCEAN_FRIGATE};
  }
`;

const EventDate = styled.div`
  margin: 0px 25px 0px 25px;
  color: ${COLOR.LUNAR_RAYS};

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 20%;
    margin: 15px 25px 15px 25px;
  }
`;

const EventCapacity = styled.div`
  margin: 5px 25px 5px 25px;
  color: ${COLOR.FRILLED_SHARK};

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 5%;
    margin: 15px 10px 15px 10px;
  }
`;

type DashboardListProps = {
  events?: EventType[];
  getEvents: () => Promise<void>;
};

export const DashboardList: React.FC<DashboardListProps> = ({
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
            <CustomLink to="/detail/" state={{ eventId: id }} key={id}>
              <Boxes>
                <EventTitle>{title}</EventTitle>
                <EventDescription>{description}</EventDescription>
                <EventOwner>
                  {owner.firstName} {owner.lastName}
                </EventOwner>

                <EventDate>
                  {dateFnsFormat(new Date(startsAt), 'LLLL d, y - p')}
                </EventDate>
                <EventCapacity>
                  {attendees.length} of {capacity}
                </EventCapacity>

                <EventCardButton
                  ownerId={owner.id}
                  userId={user.id}
                  attendees={attendees}
                  eventId={id}
                  getEvents={getEvents}
                  isAbsolute
                />
              </Boxes>
            </CustomLink>
          ),
        )}
      </ContainerBoxes>
    </>
  );
};

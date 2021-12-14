import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { DashboardBoxes } from '../components/DashboardBoxes';
import { DashboardList } from '../components/DashboardList';
import { getEventList } from '../api/events';
import { EventType } from '../model/Event';
import addBtn from '../assets/btnAdd.svg';
import { SCREEN } from '../constants';
import DownArrowDark from '../assets/downArrowDark.svg';
import { COLOR } from '../constants/colors';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: 80%;
  padding-top: 20px;

  @media (min-width: ${SCREEN.LAPTOP}) {
    padding: 100px 0px 25px 0px;
  }
`;

const ContainerContent = styled.div`
  flex: 1 0 auto;
  overflow: auto;
  padding: 0rem;
  overflow: auto;
  height: 300px;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;

const ContainerFooter = styled.footer`
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (min-width: ${SCREEN.LAPTOP}) {
    height: 80px;
    align-items: flex-start;
  }
`;

const ContainerFilters = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const ContainerViewSwitch = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const SwitchButton = styled.button<{ isactive: boolean }>`
  display: none;

  @media (min-width: ${SCREEN.LAPTOP}) {
    display: block;
    font-family: Hind;
    font-size: 12px;
    line-height: 24px;

    letter-spacing: 1px;
    background: none;
    margin-right: 10px;
    cursor: pointer;
    justify-self: flex-start;
    color: ${({ isactive }) =>
      isactive ? COLOR.BIG_STONE : COLOR.BRILLIANT_SILVER};

    &:hover {
      color: rgba(0, 0, 0, 0.85);
    }
  }
`;

const ChangeViewIcons = styled(FontAwesomeIcon)<{ isactive: boolean }>`
  margin-right: 10px;
  color: ${({ isactive }) =>
    isactive ? COLOR.BIG_STONE : COLOR.BRILLIANT_SILVER};
`;

const AddEventButton = styled.img`
  width: 56px;
  height: 56px;
  margin-right: 25px;
`;

const FilterDropdown = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  align-self: flex-end;
  z-index: 1;

  @media (min-width: ${SCREEN.LAPTOP}) {
    display: none;
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  width: 162px;
  height: 88px;
  background: ${COLOR.WHITE};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.198087);
  border-radius: 14px;
  top: 30px;
  left: 0px;

  padding: 15px;
  font-size: 14px;
  line-height: 24px;
  color: ${COLOR.SERYI_GREY};
`;

const DropdownArrow = styled.img`
  margin-left: 10px;
  color: ${COLOR.BIG_STONE};
`;

const Dashboard = () => {
  const [events, setEvents] = useState<EventType[]>();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [selectedView, setSelectedView] = useState<string>('grid');
  const [dropdown, setDropdown] = useState(false);

  const getEvents = async () => {
    let eventList = await getEventList();

    // use memo
    const today = new Date();
    if (selectedFilter === 'FUTURE') {
      eventList = eventList.filter((event) => new Date(event.startsAt) > today);
    } else if (selectedFilter === 'PAST') {
      eventList = eventList.filter((event) => new Date(event.startsAt) < today);
    }

    setEvents(eventList);
  };

  useEffect(() => {
    getEvents();
  }, [selectedFilter]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <Container>
        <ContainerHeader>
          <ContainerFilters>
            <FilterDropdown onClick={() => toggleDropdown()}>
              <span>SHOW: {selectedFilter}</span>
              <DropdownArrow src={DownArrowDark} alt="Dropdown arrow" />
              {dropdown && (
                <Dropdown>
                  <span onClick={() => setSelectedFilter('ALL')}>
                    ALL EVENTS
                  </span>
                  <span onClick={() => setSelectedFilter('FUTURE')}>
                    FUTURE EVENTS
                  </span>
                  <span onClick={() => setSelectedFilter('PAST')}>
                    PAST EVENTS
                  </span>
                </Dropdown>
              )}
            </FilterDropdown>
            <SwitchButton
              onClick={() => setSelectedFilter('ALL')}
              isactive={selectedFilter === 'ALL'}
            >
              ALL EVENTS
            </SwitchButton>
            <SwitchButton
              onClick={() => setSelectedFilter('FUTURE')}
              isactive={selectedFilter === 'FUTURE'}
            >
              FUTURE EVENTS
            </SwitchButton>
            <SwitchButton
              onClick={() => setSelectedFilter('PAST')}
              isactive={selectedFilter === 'PAST'}
            >
              PAST EVENTS
            </SwitchButton>
          </ContainerFilters>
          <ContainerViewSwitch>
            <ChangeViewIcons
              icon={faTh}
              onClick={() => setSelectedView('grid')}
              isactive={selectedView === 'grid'}
            />
            <ChangeViewIcons
              icon={faThList}
              onClick={() => setSelectedView('list')}
              isactive={selectedView === 'list'}
            />
          </ContainerViewSwitch>
        </ContainerHeader>
        <ContainerContent>
          {selectedView === 'grid' ? (
            <DashboardBoxes events={events} getEvents={getEvents} />
          ) : (
            <DashboardList events={events} getEvents={getEvents} />
          )}
        </ContainerContent>
        <ContainerFooter>
          <Link to="/createEvent">
            <AddEventButton src={addBtn} alt="Eventio add button" />
          </Link>
        </ContainerFooter>
      </Container>
    </>
  );
};

export default Dashboard;

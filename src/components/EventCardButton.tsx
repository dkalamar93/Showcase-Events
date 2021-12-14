import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { attendEvent, unattendEvent } from '../api/events';
import { SCREEN } from '../constants';
import { COLOR } from '../constants/colors';

const ActionButton = styled.button<{ color: string; isAbsolute?: boolean }>`
  position: ${({ isAbsolute }) => (isAbsolute ? 'absolute' : 'static')};
  bottom: 0px;
  right: 0px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  justify-self: flex-end;
  align-self: flex-end;
  width: 100px;
  height: 32px;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
  margin: 15px 25px 15px 25px;
  color: ${COLOR.WHITE};

  @media (min-width: ${SCREEN.LAPTOP}) {
    position: static;
    justify-self: center;
    align-self: center;
  }
`;

type EventCardButtonProps = {
  ownerId: string;
  userId: string;
  attendees: any[];
  eventId: string;
  getEvents?: () => Promise<void>;
  isAbsolute?: boolean;
};

export const EventCardButton: React.FC<EventCardButtonProps> = ({
  ownerId,
  userId,
  attendees,
  eventId,
  getEvents,
  isAbsolute,
}) => {
  const navigate = useNavigate();

  const isAttending = attendees.some((attendee) => attendee.id === userId);

  const joinEvent = async () => {
    const response = await attendEvent(eventId);

    if (response) {
      getEvents ? getEvents() : navigate('/detail', { state: { eventId } });
    }
  };

  const leaveEvent = async () => {
    const response = await unattendEvent(eventId);

    if (response) {
      getEvents ? getEvents() : navigate('/detail', { state: { eventId } });
    }
  };

  const getColor = () => {
    if (ownerId === userId) {
      return COLOR.BIG_FISH_TO_FRY;
    }

    if (isAttending) {
      return COLOR.SASQUATCH_SOCKS;
    }

    return COLOR.MAGICAL_MALACHITE;
  };

  const handleClick = () => {
    if (ownerId === userId) {
      navigate('/createEvent');

      return;
    }

    if (isAttending) {
      leaveEvent();

      return;
    }

    joinEvent();
  };

  const getText = () => {
    if (ownerId === userId) {
      return 'EDIT';
    }

    if (isAttending) {
      return 'LEAVE';
    }

    return 'JOIN';
  };

  return (
    <ActionButton
      isAbsolute={isAbsolute}
      color={getColor()}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {getText()}
    </ActionButton>
  );
};

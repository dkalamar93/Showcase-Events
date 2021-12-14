import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFnsFormat from 'date-fns/format';

import customCursor from '../assets/customCursor.svg';
import { createEvent } from '../api/events';
import { COLOR } from '../constants/colors';
import { SCREEN } from '../constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: 100%;
  min-width: 100%;
  padding: 15px;

  @media (min-width: ${SCREEN.LAPTOP}) {
    padding: 0px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 608px;
  background-color: ${COLOR.WHITE};
  padding: 40px;
`;

const CreateEventTitle = styled.h1`
  font-size: 28px;
  line-height: 48px;
  color: ${COLOR.BIG_STONE};
`;

const CreateEventDescription = styled.span`
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 35px;
  color: ${COLOR.FRILLED_SHARK};
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${COLOR.CRYSTAL_BAY};
  padding: 5px 10px;
  margin-bottom: 25px;
  width: 100%;
  outline: none;
  background-color: transparent;
  align-self: flex-start;

  ::placeholder {
    color: ${COLOR.CALLISTO};
    opacity: 1;
    font-size: 18px;
  }

  ::-webkit-calendar-picker-indicator {
    padding-left: 60%;
  }

  ::before {
    content: 'Time';
    color: ${COLOR.CALLISTO};
    opacity: 1;
    font-size: 18px;
    margin-right: 0.6em;
  }
`;

const CreateButton = styled.button`
  align-self: center;
  margin-top: 20px;
  background-color: ${COLOR.MAGICAL_MALACHITE};
  border-radius: 4px;
  width: 240px;
  height: 57px;
  font-size: 16px;
  color: ${COLOR.WHITE};
  text-align: center;
  letter-spacing: 1px;
  cursor: url(${customCursor}), auto;
`;

const DateInputWrapper = styled.div`
  width: 100%;

  .DayPickerInput {
    width: 100%;
  }

  input {
    border: none;
    border-bottom: 1px solid #dae1e7;
    padding: 5px 10px;
    margin-bottom: 25px;
    width: 100%;
    outline: none;
    background-color: transparent;
    align-self: flex-start;

    ::placeholder {
      color: ${COLOR.CALLISTO};
      opacity: 1;
      font-size: 18px;
    }
  }
`;

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // reset,
  } = useForm();

  const callCreateEventAPI = async (createRequestBody) => {
    await createEvent(createRequestBody);
  };

  const onSubmit = (data) => {
    const actDate = dateFnsFormat(new Date(data.ReactDatepicker), 'MM-dd-yyyy');
    const eventISODatetime = new Date(actDate + ' ' + data.time).toISOString();

    const createRequestBody = {
      title: data.title,
      description: data.description,
      startsAt: eventISODatetime,
      capacity: Number(data.capacity),
    };

    callCreateEventAPI(createRequestBody);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CreateEventTitle>Create new event</CreateEventTitle>
        <CreateEventDescription>Enter details below.</CreateEventDescription>
        <Input
          id="title"
          {...register('title', {
            required: 'required',
            pattern: {
              value: /\S/,
              message: 'Entered value does not match email format',
            },
          })}
          type="text"
          placeholder="Title"
        />
        {errors.title && <span>This field is required</span>}
        <Input
          id="description"
          {...register('description', {
            required: 'required',
            pattern: {
              value: /\S/,
              message: 'Entered value does not match email format',
            },
          })}
          type="text"
          placeholder="Description"
        />
        {errors.description && <span>This field is required</span>}

        <Controller
          control={control}
          name="ReactDatepicker"
          render={({ field: { onChange } }) => (
            <DateInputWrapper>
              <DayPickerInput onDayChange={onChange} placeholder="Date" />
            </DateInputWrapper>
          )}
        />
        <Input
          id="time"
          {...register('time', {
            pattern: {
              value: /\S/,
              message: 'Entered value does not match email format',
            },
          })}
          type="time"
          placeholder="Time"
        />
        <Input
          id="capacity"
          {...register('capacity', {
            required: 'required',
          })}
          type="number"
          placeholder="Capacity"
        />
        {errors.capacity && <span>This field is required</span>}

        <CreateButton type="submit">Create new event</CreateButton>
      </Form>
    </Container>
  );
};

export default CreateEvent;

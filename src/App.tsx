import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { GlobalStyles, theme } from "./theme";
import { Header } from "./components/Header";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useGetTimeSlotsByCompany } from "./hooks/useGetTimeSlotsByCompany";
import {
  checkIfTimeSlotsOverlap,
  timeSlotToFormatTime,
} from "./helpers";
import { ReservedSlots, TimeSlot } from "./models/slot.model";

function App() {
  const { data, error, loading } = useGetTimeSlotsByCompany();
  const [reservedSlots, setReservedSlots] = useState<ReservedSlots>({});

  const handleSlotClick = (companyId: number, slot: TimeSlot) =>
    setReservedSlots((prevSlots) => {
      const exists = reservedSlots[companyId] === slot;

      if (exists) {
        const { [companyId]: _, ...reducedSlots } = prevSlots;
        return reducedSlots;
      } else {
        return { ...prevSlots, [companyId]: slot };
      }
    });

  const renderSlot = (
    companyId: number,
    timeSlot: TimeSlot,
    companyReservedSlot: TimeSlot
  ) => {
    const active = companyReservedSlot === timeSlot;
    const isTimeSlotReserved = Object.entries(reservedSlots).some(
      ([reservedSlotCompanyId, reservedSlot]) =>
      checkIfTimeSlotsOverlap(timeSlot, reservedSlot) &&
        companyId !== Number(reservedSlotCompanyId)
    );
    const disabled = (!!companyReservedSlot && !active) || isTimeSlotReserved;

    return (
      <TimeSlotItem
        key={`${companyId}_${timeSlot.start_time}_${timeSlot.end_time}`}
        active={active}
        disabled={disabled}
        onClick={() => handleSlotClick(companyId, timeSlot)}
      >
        {timeSlotToFormatTime(timeSlot)}
      </TimeSlotItem>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Container>
        <Title>Choose time slots</Title>

        {loading && <LoadingSpinner />}
        {error && (
          <ErrorContainer>
            There was an error while loading time slots: {error.message}
          </ErrorContainer>
        )}

        {data?.length && (
          <CompanyList>
            {data.map(({ id: companyId, name, dates }) => {
              const companyReservedSlot = reservedSlots[companyId];

              return (
                <Company key={companyId}>
                  <CompanyName>{name}</CompanyName>
                  <SubTitle>Reservation</SubTitle>
                  <SelectedTimeSlotItem
                    empty={!companyReservedSlot}
                    onClick={() =>
                      companyReservedSlot &&
                      handleSlotClick(companyId, companyReservedSlot)
                    }
                  >
                    {companyReservedSlot &&
                      timeSlotToFormatTime(companyReservedSlot)}
                  </SelectedTimeSlotItem>

                  {dates.length && (
                    <DateList>
                      {dates.map(({ date, time_slots }) => (
                        <DateItem key={date}>
                          <DateSubTitle>{date}</DateSubTitle>
                          {time_slots.map((timeSlot) =>
                            renderSlot(
                              companyId,
                              timeSlot,
                              companyReservedSlot
                            )
                          )}
                        </DateItem>
                      ))}
                    </DateList>
                  )}
                </Company>
              );
            })}
          </CompanyList>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(2)}`};

  @media (max-width: 480px) {
    padding-top: ${({ theme }) => theme.spacing(3)};
    padding-bottom: ${({ theme }) => theme.spacing(3)};
  }
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`;

const ErrorContainer = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
`;

const CompanyList = styled.div`
  display: flex;
  overflow: auto;
  flex: 1;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Company = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  flex: 1;

  & + & {
    margin-left: ${({ theme }) => theme.spacing(1)};

    @media (max-width: 480px) {
      margin-left: 0;
      padding-top: ${({ theme }) => theme.spacing(2)};
      border-top: 1px solid ${({ theme }) => theme.colors.gray};
    }
  }

  @media (max-width: 480px) {
    padding-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

const BorderItem = styled.div<{ empty?: boolean; disabled?: boolean }>`
  height: 38px;
  width: 100%;
  align-self: center;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  cursor: pointer;
  transition: all 0.3s;
  margin-top: ${({ theme }) => theme.spacing(1)};

  pointer-events: ${({ disabled, empty }) =>
    disabled || empty ? "none" : "all"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10percent};
    color: ${({ theme }) => theme.colors.default};
  }
`;

const CompanyName = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  font-size: 20px;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const SelectedTimeSlotItem = styled(BorderItem)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  max-width: 160px;
`;

const DateItem = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;

const DateList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  max-width: 160px;

  @media (max-width: 480px) {
    max-height: 305px;
  }
`;

const SubTitle = styled.h4`
  font-size: 16px;
  margin: 0;
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`;

const DateSubTitle = styled(SubTitle)`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.light};
`;

const TimeSlotItem = styled(BorderItem)<{
  active?: boolean;
}>`
  margin-top: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme, active, disabled }) =>
    active
      ? theme.colors.secondary
      : disabled
      ? theme.colors.darkGray20percent
      : "transparent"};

  color: ${({ theme, active, disabled }) =>
    active
      ? theme.colors.light
      : disabled
      ? theme.colors.darkGray
      : theme.colors.default};

  border-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.darkGray : theme.colors.secondary};
`;

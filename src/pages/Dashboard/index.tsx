import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointments,
  Calendar,
  Section,
  Appointment,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string,
    avatar_url: string
  }

}
const Dashboard: React.FC = () => {
  const [selectDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const HandleDateChange = useCallback((day, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
      console.log(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
    console.log(month);
  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    });
  }, [selectDate]);

  const selectedDWeekDay = useMemo(() => {
    return format(selectDate, 'cccc', {
      locale: ptBR
    });
  }, [selectDate]);


  useEffect(() => {
    api.get<Appointment[]>('/appointments/me', {
      params : {
        year : selectDate.getFullYear(),
      month: selectDate.getMonth() + 1,
      day: selectDate.getDate(),
      }
    }).then(response => {
      const appointmentsFormatted = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted : format(parseISO(appointment.date), 'HH:mm')
        }
      })
      setAppointments(appointmentsFormatted)
    })
  }, [selectDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    })
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    })
  }, [appointments]);

  const nextAppointments = useMemo(() => {
    return appointments.find(appointment => {
      isAfter(parseISO(appointment.date), new Date())
    })
  }, [appointments]);



  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedDWeekDay}</span>
          </p>

          {isToday(selectDate) && nextAppointments && (
            <NextAppointments>
            <strong>Agendamento a seguir</strong>
            <div>
              <img
                src={nextAppointments.user.avatar_url}
                alt={nextAppointments.user.name}
              />
              <strong>{nextAppointments.user.name}</strong>
              <span>
                <FiClock />
                {nextAppointments.hourFormatted}
              </span>
            </div>
          </NextAppointments>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento hoje neste período </p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
              <span>
                <FiClock />
                {appointment.hourFormatted}
              </span>

              <div>
                <img
                  alt={appointment.user.name}
                  src={appointment.user.avatar_url}
                />
                <strong>{appointment.user.name}</strong>
              </div>
            </Appointment>
            ))}
          </Section>

          <Section>
          <strong>Tarde</strong>

          {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento hoje neste período </p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
              <span>
                <FiClock />
                {appointment.hourFormatted}
              </span>

              <div>
                <img
                  alt={appointment.user.name}
                  src={appointment.user.avatar_url}
                />
                <strong>{appointment.user.name}</strong>
              </div>
            </Appointment>
            ))}
          </Section>




        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectDate}
            onDayClick={HandleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;

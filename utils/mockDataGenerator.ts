import { Event } from '@/store/eventsSlice';
import dayjs from 'dayjs';

const eventTypes = [
  {
    title: 'Tech Conference',
    ruTitle: 'Техническая конференция',
    icon: '💻',
    prefix: 'Tech',
  },
  {
    title: 'Music Festival',
    ruTitle: 'Музыкальный фестиваль',
    icon: '🎵',
    prefix: 'Music',
  },
  {
    title: 'Food & Wine Expo',
    ruTitle: 'Фестиваль еды и вина',
    icon: '🍕',
    prefix: 'Food',
  },
  {
    title: 'Art Exhibition',
    ruTitle: 'Выставка искусства',
    icon: '🎨',
    prefix: 'Art',
  },
  {
    title: 'Startup Pitch',
    ruTitle: 'Презентация стартапов',
    icon: '📈',
    prefix: 'Startup',
  },
  {
    title: 'Sports Tournament',
    ruTitle: 'Спортивный турнир',
    icon: '🏀',
    prefix: 'Sports',
  },
  {
    title: 'Workshop',
    ruTitle: 'Мастер-класс',
    icon: '🛠️',
    prefix: 'Workshop',
  },
  {
    title: 'Movie Premiere',
    ruTitle: 'Премьера фильма',
    icon: '🎬',
    prefix: 'Film',
  },
  {
    title: 'Book Reading',
    ruTitle: 'Книжные чтения',
    icon: '📖',
    prefix: 'Book',
  },
  {
    title: 'Gaming Convention',
    ruTitle: 'Игровая конвенция',
    icon: '🎮',
    prefix: 'Gaming',
  },
  {
    title: 'Science Fair',
    ruTitle: 'Научная ярмарка',
    icon: '🔬',
    prefix: 'Science',
  },
  {
    title: 'Health & Wellness Expo',
    ruTitle: 'Выставка здоровья и фитнеса',
    icon: '💪',
    prefix: 'Health',
  },
  {
    title: 'Comedy Show',
    ruTitle: 'Комедийное шоу',
    icon: '😂',
    prefix: 'Comedy',
  },
  {
    title: 'Fashion Show',
    ruTitle: 'Показ мод',
    icon: '👗',
    prefix: 'Fashion',
  },
  {
    title: 'Automobile Expo',
    ruTitle: 'Авто-выставка',
    icon: '🚗',
    prefix: 'Auto',
  },
  {
    title: 'Space Exploration Summit',
    ruTitle: 'Саммит по освоению космоса',
    icon: '🚀',
    prefix: 'Space',
  },
  {
    title: 'Pet Adoption Fair',
    ruTitle: 'Ярмарка по усыновлению животных',
    icon: '🐶',
    prefix: 'Pets',
  },
  {
    title: 'Dance Competition',
    ruTitle: 'Танцевальный конкурс',
    icon: '💃',
    prefix: 'Dance',
  },
  { title: 'Yoga Retreat', ruTitle: 'Йога-ретрит', icon: '🧘', prefix: 'Yoga' },
  {
    title: 'Photography Workshop',
    ruTitle: 'Фотографический мастер-класс',
    icon: '📷',
    prefix: 'Photography',
  },
  { title: 'Marathon', ruTitle: 'Марафон', icon: '🏃', prefix: 'Marathon' },
  {
    title: 'History Symposium',
    ruTitle: 'Исторический симпозиум',
    icon: '🏛️',
    prefix: 'History',
  },
  {
    title: 'Charity Gala',
    ruTitle: 'Благотворительный вечер',
    icon: '❤️',
    prefix: 'Charity',
  },
  {
    title: 'Wine Tasting',
    ruTitle: 'Дегустация вина',
    icon: '🍷',
    prefix: 'Wine',
  },
  {
    title: 'Cooking Class',
    ruTitle: 'Кулинарный мастер-класс',
    icon: '🍳',
    prefix: 'Cooking',
  },
  { title: 'Trivia Night', ruTitle: 'Викторина', icon: '❓', prefix: 'Trivia' },
  {
    title: 'Esports Tournament',
    ruTitle: 'Киберспортивный турнир',
    icon: '🎮',
    prefix: 'Esports',
  },
  {
    title: 'Meditation Workshop',
    ruTitle: 'Медитационный тренинг',
    icon: '🕉️',
    prefix: 'Meditation',
  },
  {
    title: 'Bicycle Race',
    ruTitle: 'Велогонка',
    icon: '🚴',
    prefix: 'Cycling',
  },
  {
    title: 'Film Screening',
    ruTitle: 'Кинопоказ',
    icon: '📽️',
    prefix: 'Cinema',
  },
  {
    title: 'Virtual Reality Expo',
    ruTitle: 'Выставка виртуальной реальности',
    icon: '🕶️',
    prefix: 'VR',
  },
  {
    title: 'Tattoo Convention',
    ruTitle: 'Конвенция тату',
    icon: '🖋️',
    prefix: 'Tattoo',
  },
  {
    title: 'Hiking Meetup',
    ruTitle: 'Походный митап',
    icon: '🥾',
    prefix: 'Hiking',
  },
  {
    title: 'Home & Garden Show',
    ruTitle: 'Выставка дома и сада',
    icon: '🏡',
    prefix: 'Home',
  },
  {
    title: 'Astrology & Tarot Reading',
    ruTitle: 'Астрология и гадание на таро',
    icon: '🔮',
    prefix: 'Astrology',
  },
];

const descriptions = [
  {
    description:
      'Join us for an exciting event featuring industry experts and innovative ideas.',
    ruDescription:
      'Присоединяйтесь к захватывающему событию с участием экспертов отрасли и инновационных идей.',
  },
  {
    description:
      'Experience an unforgettable day filled with amazing performances and activities.',
    ruDescription:
      'Ощутите незабываемый день, наполненный потрясающими выступлениями и активностями.',
  },
  {
    description:
      'Discover new perspectives and connect with like-minded individuals.',
    ruDescription:
      'Откройте новые перспективы и познакомьтесь с единомышленниками.',
  },
  {
    description: 'An exclusive gathering showcasing the best in the field.',
    ruDescription:
      'Эксклюзивное мероприятие, демонстрирующее лучшее в своей области.',
  },
  {
    description:
      "Don't miss this opportunity to learn from the best in the industry.",
    ruDescription: 'Не упустите возможность учиться у лучших в отрасли.',
  },
  {
    description:
      'A fun-filled day with workshops, networking, and entertainment.',
    ruDescription:
      'Веселый день с мастер-классами, нетворкингом и развлечениями.',
  },
  {
    description: 'Engage with thought leaders and pioneers in the industry.',
    ruDescription: 'Общайтесь с лидерами мнений и первопроходцами в отрасли.',
  },
  {
    description: 'Celebrate creativity and innovation at this special event.',
    ruDescription: 'Отметьте творчество и инновации на этом особом событии.',
  },
  {
    description: 'A must-attend event for professionals and enthusiasts alike.',
    ruDescription: 'Обязательное мероприятие для профессионалов и энтузиастов.',
  },
  {
    description: 'Enjoy hands-on experiences and interactive exhibits.',
    ruDescription: 'Испытайте интерактивные экспонаты и практический опыт.',
  },
  {
    description: 'Immerse yourself in an experience like never before.',
    ruDescription:
      'Погрузитесь в незабываемый опыт, которого у вас еще не было.',
  },
  {
    description:
      'Step into the future with groundbreaking discussions and demonstrations.',
    ruDescription:
      'Шагните в будущее с революционными обсуждениями и демонстрациями.',
  },
  {
    description:
      'Network with professionals and make valuable business connections.',
    ruDescription: 'Заводите деловые знакомства и общайтесь с профессионалами.',
  },
  {
    description: 'A showcase of incredible talent and artistic expression.',
    ruDescription:
      'Демонстрация невероятного таланта и художественного самовыражения.',
  },
  {
    description:
      'Experience the future of creativity and technology in one place.',
    ruDescription: 'Испытайте будущее творчества и технологий в одном месте.',
  },
  {
    description:
      'An inspiring event that will leave you motivated and empowered.',
    ruDescription:
      'Вдохновляющее событие, которое придаст вам сил и мотивации.',
  },
];

export function generateMockEvents(count: number) {
  const events: Event[] = [];
  const startDate = new Date();

  for (let i = 0; i < count; i++) {
    const eventType = eventTypes[i % eventTypes.length];
    const description = descriptions[i % descriptions.length];
    const date = dayjs(startDate).add(i, 'days').toISOString();

    events.push({
      id: i + 1,
      title: `${eventType.title} ${Math.floor(i / eventTypes.length) + 1}`,
      ruTitle: `${eventType.ruTitle} ${Math.floor(i / eventTypes.length) + 1}`,
      description: description.description,
      ruDescription: description.ruDescription,
      date,
      icon: eventType.icon,
    });
  }

  return events;
}

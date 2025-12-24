import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const GREETINGS = {
  birthday: [
    "С Днём Рождения! Пусть сбываются мечты! 🎂",
    "Поздравляю с Днём Рождения! Счастья, радости, успехов! 🎉",
    "С Днём Рождения! Пусть каждый день приносит радость! 🎈",
    "Желаю яркого праздника и незабываемых моментов! 🎁",
  ],
  newyear: [
    "С Новым Годом! Пусть он принесёт радость и удачу! ✨",
    "Счастливого Нового Года! Волшебства и чудес! 🎄",
    "С Новым Годом! Пусть сбываются все желания! 🎆",
    "Новый год — новые возможности! Удачи и счастья! 🥂",
  ],
  march8: [
    "С 8 Марта! Будьте счастливы и любимы! 🌸",
    "Поздравляю с Международным женским днём! 💐",
    "С 8 Марта! Пусть весна приносит радость! 🌷",
    "С праздником весны! Красоты и вдохновения! 🌺",
  ],
  wedding: [
    "С Днём Свадьбы! Совет да любовь! 💍",
    "Поздравляем с бракосочетанием! Счастья вам! 💕",
    "С Днём Свадьбы! Пусть любовь живёт вечно! 👰",
    "Совет да любовь! Крепкой семьи и радости! 💑",
  ],
  valentines: [
    "С Днём Святого Валентина! Любви и страсти! ❤️",
    "Поздравляю с Днём всех влюблённых! 💘",
    "С Днём Валентина! Пусть любовь окрыляет! 💓",
    "День влюблённых! Романтики и нежности! 💖",
  ],
  graduation: [
    "С Выпускным! Новых вершин и достижений! 🎓",
    "Поздравляю с окончанием! Успехов в будущем! 📚",
    "С Выпускным! Пусть мечты сбываются! 🌟",
    "Новая глава жизни! Удачи и вдохновения! 🚀",
  ],
};

const THEME_INFO = [
  { id: 'birthday', name: 'День Рождения', emoji: '🎂', color: 'from-pink-500 to-purple-500' },
  { id: 'newyear', name: 'Новый Год', emoji: '🎄', color: 'from-blue-500 to-cyan-500' },
  { id: 'march8', name: '8 Марта', emoji: '🌸', color: 'from-pink-400 to-rose-500' },
  { id: 'wedding', name: 'Свадьба', emoji: '💍', color: 'from-purple-400 to-pink-400' },
  { id: 'valentines', name: 'День Валентина', emoji: '❤️', color: 'from-red-500 to-pink-500' },
  { id: 'graduation', name: 'Выпускной', emoji: '🎓', color: 'from-indigo-500 to-purple-500' },
];

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof GREETINGS>('birthday');
  const [currentGreeting, setCurrentGreeting] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const getRandomGreeting = (theme: keyof typeof GREETINGS) => {
    const greetings = GREETINGS[theme];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  useEffect(() => {
    setCurrentGreeting(getRandomGreeting(currentTheme));
    setShowConfetti(true);
    playSound();
    
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [currentTheme]);

  const handleThemeChange = (theme: keyof typeof GREETINGS) => {
    setCurrentTheme(theme);
  };

  const handleRefresh = () => {
    setCurrentGreeting(getRandomGreeting(currentTheme));
    setShowConfetti(true);
    playSound();
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const themeColors = THEME_INFO.find(t => t.id === currentTheme)?.color || 'from-purple-500 to-pink-500';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors} relative overflow-hidden`}>
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                background: ['#F97316', '#D946EF', '#8B5CF6', '#0EA5E9', '#FBBF24'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-4xl animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            Поздравляем! 🎉
          </h1>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl animate-pulse-glow">
            <p className="text-3xl md:text-5xl font-semibold text-gray-800 leading-relaxed">
              {currentGreeting}
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            size="lg"
            className="mt-8 text-xl px-8 py-6 bg-white text-purple-600 hover:bg-purple-50 shadow-xl transform hover:scale-105 transition-all"
          >
            <Icon name="RefreshCw" className="mr-2" size={24} />
            Новое поздравление
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white text-center mb-6 drop-shadow-lg">
            Выберите тему праздника
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {THEME_INFO.map((theme) => (
              <Card
                key={theme.id}
                onClick={() => handleThemeChange(theme.id as keyof typeof GREETINGS)}
                className={`cursor-pointer p-6 text-center transform hover:scale-110 transition-all duration-300 ${
                  currentTheme === theme.id
                    ? 'ring-4 ring-white shadow-2xl scale-105'
                    : 'hover:shadow-xl'
                } bg-white/95 backdrop-blur-sm`}
              >
                <div className="text-5xl mb-3">{theme.emoji}</div>
                <p className="font-semibold text-lg text-gray-800">{theme.name}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Галерея праздничных тем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THEME_INFO.map((theme) => (
              <Card
                key={`gallery-${theme.id}`}
                className={`p-6 bg-gradient-to-br ${theme.color} text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                onClick={() => handleThemeChange(theme.id as keyof typeof GREETINGS)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl">{theme.emoji}</div>
                  <h3 className="text-2xl font-bold">{theme.name}</h3>
                </div>
                <p className="text-white/90 text-sm">
                  {GREETINGS[theme.id as keyof typeof GREETINGS].length} уникальных поздравлений
                </p>
                <div className="mt-4 flex items-center gap-2 text-white/80">
                  <Icon name="Sparkles" size={16} />
                  <span className="text-sm">Нажмите, чтобы выбрать</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-6 text-center">
        <p className="text-white text-lg font-medium drop-shadow-lg">
          Обновите страницу для нового поздравления! 🎊
        </p>
      </div>
    </div>
  );
};

export default Index;

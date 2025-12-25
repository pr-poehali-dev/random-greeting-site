import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const GREETINGS = {
  birthday: [
    "С Днём Рождения! Пусть сбываются мечты! 🎂",
    "Поздравляю с Днём Рождения! Счастья, радости, успехов! 🎉",
    "С Днём Рождения! Пусть каждый день приносит радость! 🎈",
    "Желаю яркого праздника и незабываемых моментов! 🎁",
    "Пусть жизнь дарит только приятные сюрпризы! 🎊",
    "С Днём Рождения! Здоровья, любви и процветания! 🌟",
    "Пусть этот день станет началом лучшего года в жизни! 🎯",
    "Желаю море позитива и исполнения желаний! 🌈",
  ],
  newyear: [
    "С Новым Годом! Пусть он принесёт радость и удачу! ✨",
    "Счастливого Нового Года! Волшебства и чудес! 🎄",
    "С Новым Годом! Пусть сбываются все желания! 🎆",
    "Новый год — новые возможности! Удачи и счастья! 🥂",
    "Пусть Новый год будет ярким и незабываемым! 🌟",
    "С Новым Годом! Тепла, уюта и семейного счастья! 🏡",
    "Пусть каждый день нового года приносит радость! ⭐",
    "С Новым Годом! Пусть мечты станут реальностью! 🎇",
  ],
  march8: [
    "С 8 Марта! Будьте счастливы и любимы! 🌸",
    "Поздравляю с Международным женским днём! 💐",
    "С 8 Марта! Пусть весна приносит радость! 🌷",
    "С праздником весны! Красоты и вдохновения! 🌺",
    "С 8 Марта! Пусть каждый день будет солнечным! ☀️",
    "Желаю нежности, любви и исполнения желаний! 💕",
    "С праздником! Пусть жизнь цветёт как весенний сад! 🌹",
    "С 8 Марта! Счастья, здоровья и улыбок! 😊",
  ],
  wedding: [
    "С Днём Свадьбы! Совет да любовь! 💍",
    "Поздравляем с бракосочетанием! Счастья вам! 💕",
    "С Днём Свадьбы! Пусть любовь живёт вечно! 👰",
    "Совет да любовь! Крепкой семьи и радости! 💑",
    "Пусть ваш союз будет крепким и счастливым! 💖",
    "С бракосочетанием! Пусть любовь растёт с каждым днём! 🌹",
    "Желаем жить душа в душу долгие годы! 🥰",
    "С Днём Свадьбы! Пусть жизнь будет полна любви! 💝",
  ],
  valentines: [
    "С Днём Святого Валентина! Любви и страсти! ❤️",
    "Поздравляю с Днём всех влюблённых! 💘",
    "С Днём Валентина! Пусть любовь окрыляет! 💓",
    "День влюблённых! Романтики и нежности! 💖",
    "С Днём влюблённых! Пусть сердце бьётся от счастья! 💗",
    "Пусть любовь наполняет каждый день волшебством! 💝",
    "С Днём Валентина! Тепла, нежности и романтики! 💕",
    "День любви! Пусть чувства никогда не угасают! ❣️",
  ],
  graduation: [
    "С Выпускным! Новых вершин и достижений! 🎓",
    "Поздравляю с окончанием! Успехов в будущем! 📚",
    "С Выпускным! Пусть мечты сбываются! 🌟",
    "Новая глава жизни! Удачи и вдохновения! 🚀",
    "С Выпускным! Пусть знания откроют все двери! 🎯",
    "Поздравляю с успешным завершением! Вперёд к целям! 💪",
    "С Выпускным! Пусть будущее будет ярким! ✨",
    "Окончание — это только начало! Успехов в жизни! 🌈",
  ],
};

const THEME_MUSIC = {
  birthday: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  newyear: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  march8: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  wedding: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  valentines: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  graduation: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [recipientName, setRecipientName] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = THEME_MUSIC[theme];
      audioRef.current.play();
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(THEME_MUSIC[currentTheme]);
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleRefresh = () => {
    setCurrentGreeting(getRandomGreeting(currentTheme));
    setShowConfetti(true);
    playSound();
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleShare = () => {
    const nameText = recipientName ? `${recipientName}, ${currentGreeting.toLowerCase()}` : currentGreeting;
    const shareText = `${nameText}\n\nСоздай своё поздравление на`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Поздравление',
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const themeColors = THEME_INFO.find(t => t.id === currentTheme)?.color || 'from-purple-500 to-pink-500';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors} relative overflow-hidden`}>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/ff6c77e7-51e5-4252-b979-4e351c10d85e/files/ab36f841-d6b0-40a0-953e-dcf1b47b7a9f.jpg)' }}
      />
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
            Поздравляем{recipientName && `, ${recipientName}`}! 🎉
          </h1>
          
          <div className="mb-6 max-w-md mx-auto">
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Введите имя получателя"
              className="w-full px-6 py-4 text-xl text-center rounded-2xl border-2 border-white/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/50 focus:border-white transition-all shadow-lg"
            />
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl animate-pulse-glow">
            <p className="text-3xl md:text-5xl font-semibold text-gray-800 leading-relaxed">
              {currentGreeting}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={handleRefresh}
              size="lg"
              className="text-xl px-8 py-6 bg-white text-purple-600 hover:bg-purple-50 shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name="RefreshCw" className="mr-2" size={24} />
              Новое поздравление
            </Button>
            <Button
              onClick={handleShare}
              size="lg"
              className="text-xl px-8 py-6 bg-green-500 text-white hover:bg-green-600 shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name="Share2" className="mr-2" size={24} />
              Поделиться
            </Button>
            <Button
              onClick={toggleMusic}
              size="lg"
              className="text-xl px-8 py-6 bg-blue-500 text-white hover:bg-blue-600 shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} className="mr-2" size={24} />
              {isPlaying ? 'Остановить' : 'Музыка'}
            </Button>
          </div>
          
          {isPlaying && (
            <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-xl animate-fade-in-up">
              <div className="flex items-center gap-4">
                <Icon name="Volume2" size={24} className="text-gray-700" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-lg font-semibold text-gray-700 min-w-[3rem]">{volume}%</span>
              </div>
            </div>
          )}
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
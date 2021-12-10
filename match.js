module.exports = class Match {
    constructor() {
      this.events = [];
      this.action = 'Идёт перемещение мяча по полю, игроки и той, и другой команды активно пытаются атаковать';
      this.freekick = 'Нарушение правил, будет штрафной удар';
      this.goal = 'Отличный удар! И Г-О-Л!';
    }
  
    game() {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        this.events.push(this.probability());
        if (count === 50) {
            this.events[this.events.length - 1] = {
                type: 'action',
                date: Match.date(),
                text: 'Матч завершился',
            }
          count = 0;
          return clearInterval(interval);
        }
      }, 10000);
    }
  
    probability() {
      const chance = Math.round(Math.random() * 10);
      if (chance < 5) {
        return {
            type: 'action',
            date: Match.date(),
            text: this.action,
        }
      } if (chance > 4 && chance < 9) {
        return {
            type: 'freekick',
            date: Match.date(),
            text: this.freekick,
        }
      } if (chance >= 9) {
        return {
            type: 'goal',
            date: Match.date(),
            text: this.goal,
        }
      }
      return 'Game end.';
    }

    static date() {
        const year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let hours = new Date().getHours();
        let minute = new Date().getMinutes();
        let seconds = new Date().getSeconds();
    
        if (String(month).length === 1) {
          month = `0${month}`;
        }
        if (String(day).length === 1) {
          day = `0${day}`;
        }
        if (String(minute).length === 1) {
          minute = `0${minute}`;
        }
        if (String(seconds).length === 1) {
          seconds = `0${seconds}`;
        }
        if (String(hours).length === 1) {
          hours = `0${hours}`;
        }
        return `${hours}:${minute}:${seconds} ${day}.${month}.${String(year).slice(2)}`;
      }
  }
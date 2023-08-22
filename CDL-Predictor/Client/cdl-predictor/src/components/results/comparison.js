export const Comparison = (team1, team2) => {

  let hpWinner = ''
  let sndWinner = ''
  let conWinner = ''
  let winner = ''
  let resultsText = ''
  const finalScore = [0, 0]

  //COMPARES HARDPOINT WIN PERCENTAGES 

  if (team1.hp > team2.hp) {
    hpWinner = team1.fullTeamName;
    finalScore[0]++
  }

  else {
    hpWinner = team2.fullTeamName;
    finalScore[1]++
  }

  //COMPARES SEARCH AND DESTROY WIN PERCENTAGES 

  if (team1.snd > team2.snd) {
    sndWinner = team1.fullTeamName;
    finalScore[0]++
  }

  else {
    sndWinner = team2.fullTeamName;
    finalScore[1]++
  }

  //COMPARES CONTROL WIN PERCENTAGES 

  if (team1.con > team2.con) {
    conWinner = team1.fullTeamName;
    finalScore[0]++
  }

  else {
    conWinner = team2.fullTeamName;
    finalScore[1]++
  }

  //FIND EXPECTED WINNER OF SERIES BASED ON EACH GAME MODE

  //checks if winner = all 3 game modes
  if (hpWinner === sndWinner && hpWinner === conWinner) {
    resultsText = 'are most likely to win the series because they have a higher win percentage in ALL 3 game modes';
    winner = hpWinner;
    //finalScore should be 3-0 so it does not need adjusted
  }

  //checks if winner = HP and SND
  else if (hpWinner === sndWinner) {
    resultsText = 'are most likely to win the series because they have a higher win percentage in Hardpoint and Search and Destroy';
    winner = hpWinner;

    //finalScore should be either 2-1 or 1-2, change the 2 to a 3 because the same team should win the 2nd hardpoint
    finalScore[0] === 2 ? finalScore[0]++ : finalScore[1]++

  }

  //checks if winner = HP and CON
  else if (hpWinner === conWinner) {

    resultsText = 'are most likely to win the series because they have a higher win percentage in Hardpoint and Control';
    winner = hpWinner;

    //finalScore should be either 2-1 or 1-2, change the 2 to a 3 because the same team should win the 2nd hardpoint
    finalScore[0] === 2 ? finalScore[0] = 3 : finalScore[1] = 3
  }

  //checks if winner = SND and CON
  else {
    resultsText = 'are most likely to win the series because they have a higher win percentage in Search and Destroy and Control';
    winner = sndWinner;

    //THIS IS A NESLO finalScore should be either 2-1 or 1-2, but change the 2 to a 3 and the 1 to a 2, because one team should win one control and both search and destroys
    finalScore[0]++
    finalScore[1]++

  }

  return {
    finalScore: finalScore,
    winner: winner,
    resultsText: resultsText
  }

}
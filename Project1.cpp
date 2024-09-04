/*
Algorithms and Problem Solving - Level 2
Project #1 - Rock, Paper, Scissor
*/

// Project Requirements
/*
(1) The user (henceforth referred to as the player) shall be prompted to enter the number of rounds after which the game ends and the results are concluded. The number of rounds can be any positive integer.
(2) Each round should start with the player making their choice, followed by the computer making its choice (via picking a random choice).
(3) Each round should end with the choices of both the player and the computer, as well as the result of the round printed on the screen.
	(3 - A) If the player loses the round, the screen shall have a red color and a bell sound shall be produced.
	(3 - B) If the player wins the round, the screen shall have a green color.
(4) After the game finishes, the program should:
	(4 - 1) Print a "Game Over" message.
	(4 - 2) Print the number of rounds in which the player has won, lost or was at a draw against the computer.
	(3 - 3) Prompt the user to enter whether or not they wish to play again.

Refer to https://programmingadvices.com/courses/00316b1111/lectures/41056825.
*/

#include <iostream>
#include <iomanip>
#include <cstdlib>
#include <ctime>
#include <string>
using namespace std;

void DisplayTitle()
{
	cout << "==================================================" << "\n";
	cout << "             Rock, Paper, Scissors!               " << "\n";
	cout << "==================================================" << "\n";

	cout << "\n";

	cout << "Hello and Welcome to \"Rock, Paper, Scissors!\", Please follow the instructions below:" << "\n\n";
}

int ReadNumberofRounds()
{
	int NumberofRounds = 0;

	do
	{
		cout << "Please enter the number of rounds you wish to play before the game is concluded." << "\n";
		cout << "* Input can be any positive integer." << "\n";
		cin >> NumberofRounds;
	} while (NumberofRounds <= 0);

	return NumberofRounds;
}

enum Item { Rock = 0, Scissor = 1, Paper = 2 };

enum Status { PlayerLost = 0, PlayerWon = 1, GameTied = 2 };

struct RPSRoundStats
{
	int RoundNumber;
	Item PlayerChoice, ComputerChoice;
	Status PlayerStatus;
};

struct RPSGameStats
{
	int NumberofRounds;
	unsigned RoundsWon, RoundsLost, RoundsTied;
	Status PlayerStatus;
};

Item ReadPlayerChoice()
{
	unsigned short PlayerChoice = 0;
	do
	{
		cout << "\n" << "Please enter the number corresponding to the desired item from the list below:" << "\n";
		cout << "[0] Rock" << "\n";
		cout << "[1] Scissor" << "\n";
		cout << "[2] Paper" << "\n";

		cin >> PlayerChoice;
	} while (PlayerChoice < 0 || PlayerChoice > 3);

	return Item(PlayerChoice);
}

int GenerateRandomNumberBet(int start, int end)
{
	return (rand() % (end - start + 1)) + start;
}

Item ReadComputerChoice()
{
	cout << "\n" << "The computer is choosing an item..." << "\n";

	unsigned short ComputerChoice = GenerateRandomNumberBet(0, 2);

	return Item(ComputerChoice);
}

string Choice(Item Choice)
{
	string Items[3] = { "Rock", "Scissor", "Paper" };
	return Items[int(Choice)];
}

void EvaluteRoundStatus(RPSRoundStats& RoundStats)
{
	if (RoundStats.PlayerChoice == RoundStats.ComputerChoice)
		RoundStats.PlayerStatus = Status::GameTied;
	else if (RoundStats.PlayerChoice == Item::Rock && RoundStats.ComputerChoice == Item::Paper)
		RoundStats.PlayerStatus = Status::PlayerLost;
	else if (RoundStats.PlayerChoice == Item::Paper && RoundStats.ComputerChoice == Item::Rock)
		RoundStats.PlayerStatus = Status::PlayerWon;
	else
	{
		if (int(RoundStats.PlayerChoice) < int(RoundStats.ComputerChoice))
			RoundStats.PlayerStatus = Status::PlayerWon;
		else
			RoundStats.PlayerStatus = Status::PlayerLost;
	}
}

string Result(Status WinLose)
{
	string Status_[3] = { "You have lost", "You have won", "You are are at a draw with the computer" };
	return Status_[int(WinLose)];
}

void RespondtoStatus(Status PlayerStatus)
{
	switch (PlayerStatus)
	{
	case Status::PlayerLost:
		system("Color 47");
		cout << "\a";
		break;
	case Status::PlayerWon:
		system("Color 27");
		break;
	case Status::GameTied:
		system("Color 60");
		break;
	}
}

void RoundOver(RPSRoundStats& RoundStats)
{
	EvaluteRoundStatus(RoundStats);

	cout << "\n";

	cout << "You have chosen: " << Choice(RoundStats.PlayerChoice) << "\n";
	cout << "The computer has chosen: " << Choice(RoundStats.ComputerChoice) << "\n\n";

	cout << Result(RoundStats.PlayerStatus) << " this round." << "\n";

	RespondtoStatus(RoundStats.PlayerStatus);
}

RPSRoundStats Round()
{
	RPSRoundStats RoundStats;

	RoundStats.PlayerChoice = ReadPlayerChoice(), RoundStats.ComputerChoice = ReadComputerChoice();
	RoundStats.PlayerStatus = Status::GameTied;

	RoundOver(RoundStats);

	return RoundStats;
}

void EvaluteGameStatus(RPSGameStats& GameStats)
{
	if (GameStats.RoundsWon < GameStats.RoundsLost)
		GameStats.PlayerStatus = Status::PlayerLost;
	else if (GameStats.RoundsWon > GameStats.RoundsLost)
		GameStats.PlayerStatus = Status::PlayerWon;
	else
		GameStats.PlayerStatus = Status::GameTied;
}

RPSGameStats Game()
{
	RPSGameStats GameStats = { 0u ,0u, 0u, 0u };
	GameStats.NumberofRounds = ReadNumberofRounds();

	for (int i = 1; i <= GameStats.NumberofRounds; i++)
	{
		cout << "\n";

		cout << "==========" << "\n";
		cout << "Round " << i << "\n";
		cout << "==========" << "\n";

		cout << "\n";

		switch (Round().PlayerStatus)
		{
		case Status::PlayerLost:
			GameStats.RoundsLost++;
			continue;
		case Status::PlayerWon:
			GameStats.RoundsWon++;
			continue;
		case Status::GameTied:
			GameStats.RoundsTied++;
			continue;
		}
	}

	return GameStats;
}

void GameOver(RPSGameStats& GameStats)
{
	cout << "\n" << "The specified number of rounds has been finished; Game Over!" << "\n";

	cout << "\n";

	cout << "==========" << "\n";
	cout << "Results" << "\n";
	cout << "==========" << "\n";

	cout << "\n";

	cout << "Number of rounds played: " << GameStats.NumberofRounds << " round(s)." << "\n";

	cout << "--------------------" << "+" << "--------------------" << "+" << "--------------------" << "\n";
	cout << setw(20) << left << "Rounds Won" << "|" << setw(20) << left << "Rounds Lost" << "|" << setw(20) << left << "Rounds Tied" << "|" << "\n";
	cout << "--------------------" << "+" << "--------------------" << "+" << "--------------------" << "\n";
	cout << setw(20) << left << GameStats.RoundsWon << "|" << setw(20) << left << GameStats.RoundsLost << "|" << setw(20) << left << GameStats.RoundsTied << "|" << "\n";
	cout << "--------------------" << "+" << "---------------------" << "+" << "-------------------" << "\n";

	EvaluteGameStatus(GameStats);

	cout << "\n" << Result(GameStats.PlayerStatus) << " this game." << "\n";
	cout << "\n";
	RespondtoStatus(GameStats.PlayerStatus);
}

void ResetScreen()
{
	system("cls");		// clears the console
	system("Color 07");
}

void RPS()
{
	DisplayTitle();

	bool PlayAgain = 0;

	do
	{
		ResetScreen();

		RPSGameStats GameStats = Game();

		GameOver(GameStats);

		cout << "Do you wish to play again? Please enter the number corresponding to the desired choice from the list below:" << "\n";
		cout << "[0] No" << "\n";
		cout << "[1] Yes" << "\n";
		cin >> PlayAgain;

	} while (PlayAgain);
}

int main()
{
	srand(unsigned int(time(NULL)));

	RPS();

	return 0;
}



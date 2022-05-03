#include <cs50.h>
#include <stdio.h>
#include <string.h>

// declare functions
void tabulate(void);
bool vote(int voter, int rank, string name);
int get_index(string name);
int find_min(void);
void eliminate(int min);
bool print_winner(void);
bool is_tie(void);

typedef struct{
    string name;
    int vote;
    bool elim;
} candidate;

// Define Vars
#define MAX_CANDIDATES 100
#define MAX_VOTERS 20
int voter_count;
int candidate_count;
string winner;

// Candidate Matrix
candidate candidates[MAX_CANDIDATES];

// Preference matrix
int preferences[MAX_VOTERS][MAX_CANDIDATES];

int main(int argc, string argv[]) // MAIN
{

// TODO Valid usage check
candidate_count = argc - 1;
if (argc < 2)
{
    printf("Usage is ./tabulate Candidate ...\n");
    return 0;
}


voter_count = get_int("How many voters will there be? ");

// candidate struct
for (int i = 0; i < candidate_count; i++)
{
    candidates[i].name = argv[i + 1]; // +1 because argv[0] == program name
    candidates[i].vote = 0;
    candidates[i].elim = false;
}

// collect votes and construct preference matrix preferences[i][j]
for (int i = 0; i < voter_count; i++)
{
    for (int j = 0; j < candidate_count; j++)
    {
        string name = get_string("Voter %i's #%i choice: ", i + 1, j + 1);
        if (!vote(i, j, name))
        {
            printf("Invalid vote - no such candidate\n");
            j--;
        }
    }
}

// tabulate the votes
tabulate();

} // END MAIN

// get index of candidate name
int get_index(string name)
{
    for (int i = 0; i < candidate_count; i++)
    {
        if (strcmp(candidates[i].name, name) == 0)
        {
            return i;
        }
    }
    return -1;
}

// Vote
bool vote(int voter, int rank, string name)
{
    int index = get_index(name);
    if (index == -1)
    {
        return false;
    }
    else
    {
        preferences[voter][rank] = index;
        return true;
    }
}

// define tabulate
void tabulate(void)
{
    for (int i = 0; i < voter_count; i++) // tabulate initial votes
    {
        for (int j = 0; j < candidate_count; j++)
        {
            int index = preferences[i][j];
            if (candidates[index].elim == false)
            {
                candidates[index].vote++;
                j = candidate_count;
            }
        }
    }

    for (int i = 0; i < candidate_count; i++) // this is just to verify vote counting is correct
    {
        printf("Candidate %s got %i votes\n", candidates[i].name, candidates[i].vote);
    }

    if (is_tie() == true) // check for a tie
    {
        printf("There is a tie between "); //no do this in the is_tie function
        for (int i = 0; i < candidate_count; i++)
        {
            if (candidates[i].elim == false)
            {
                printf("%s ", candidates[i].name);
            }
        }
        printf("\n");
        return;
    }
    if (!print_winner())// winner if there is a majority
    {
        eliminate(find_min());
        tabulate();
    }
    else
    {
        return;
    }
}

bool is_tie(void) // check for a tie by seeing if a non-eliminated candidate has the same votes as the minimum.
{
    int evaluator = 0; // if it is ever changed, there is NOT a tie
    for (int i = 0; i < candidate_count - 1; i++) // - 1 because you are comparing one variable to the one next to it
    {
        if (candidates[i].elim == false)
        {
            if (candidates[i].vote != candidates[i + 1].vote)
            {
                evaluator++;
                return false;
            }
            else
            {
                // no change to anything
            }
        }
    }
    return true;
}

bool print_winner(void) // display the winner of the election
{
    int majority = voter_count / 2;
    for (int i = 0; i < candidate_count; i++)
    {
        if (candidates[i].vote > majority)
        {
            winner = candidates[i].name;
            printf("The winner by majority vote is: %s\n", winner);
            return true;
        }
    }
    return false;
}

void eliminate(int min) // eliminate lowest votes
{
    for (int i = 0; i < candidate_count; i++)
    {
        if (candidates[i].vote == min)
        {
            candidates[i].elim = true;
            printf("Candidate %s has been eliminated\nRetabulating...\n", candidates[i].name);
        }
    }
    for (int i = 0; i < candidate_count; i++)
    {
    candidates[i].vote = 0; // Reset the votes
    }
    return;
}

// find the minimum number of votes to eliminate candidate
int find_min(void)
{
    int min = 0;
    bool found_first = false;
    for (int i = 0; i < candidate_count; i++)
    {
        if (!candidates[i].elim)
        {
            if (!found_first)
            {
                found_first = true;
                min = candidates[i].vote;
            }
            else if (candidates[i].vote < min)
            {
                min = candidates[i].vote;
            }
        }
    }
    return min;
}
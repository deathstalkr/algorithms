# **Smith-Waterman Algorithm**

This guide will help you understand the Smith-Waterman algorithm, a key tool used to find similarities in biological sequences like DNA.

## **What is the Smith-Waterman Algorithm?**

Imagine you have two long strings of letters (like DNA sequences). The Smith-Waterman algorithm is a smart way to find the *most similar little pieces* within those two strings. It's like finding a matching phrase in two different books, even if the books are mostly about different things.

This is super useful in biology to find:

* **Local Alignments:** It doesn't try to match the entire sequence from start to finish. Instead, it looks for the best "local" matches, which are short, highly similar segments.  
* **Key Patterns:** It helps identify important common patterns (like genes or protein parts) that might be hidden within larger, less similar sequences.

## **How Does It Work?**

The algorithm works in two main parts:

### **Part 1: Building a Score Grid**

We create a grid (or matrix) to score every possible way the sequences could line up.

1. **The Empty Grid:**

\* We start with an empty grid. The first row and column are always filled with zeros. Think of these zeros as a "fresh start" button – if a match isn't going well, the algorithm can always reset to zero and look for a new, better match elsewhere.

2. **Filling the Grid (One Box at a Time):**

\* For each empty box in the grid, we look at three neighbors: the box above, the box to the left, and the box diagonally up-left.  
\* We then calculate four possible scores for the current box:  
\* Matching/Mismatching: Take the score from the diagonal box, and add points if the letters match (e.g., 'A' and 'A') or subtract points if they don't match (e.g., 'A' and 'G').  
\* Gap in Sequence 1: Take the score from the box above, and subtract points because we're inserting a "gap" in the first sequence.  
\* Gap in Sequence 2: Take the score from the box to the left, and subtract points because we're inserting a "gap" in the second sequence.  
\* Reset to Zero: If all the scores above are negative, we simply set the current box's score to 0\. This is how the algorithm finds "local" similarities – it essentially ignores bad matches and looks for new good ones.

The score for the current box is the highest of these four possibilities.  
As we fill the grid, we also keep track of the absolute highest score we find anywhere in the entire grid. This highest score tells us how good our best local match is.

**The Score Formula for Each Box (H(i,j)):**  
![formula](https://github.com/deathstalkr/algorithms/blob/Smith-Waterman/Dynamic%20Programming/Smith-Waterman/Screenshot%20from%202025-06-26%2015-31-10.png?raw=true)

### **Part 2: Tracing Back to Find the Best Match**

Once the entire grid is filled, we find the actual similar segments:

1. **Find the Highest Score:** We locate the box in the grid that holds the single highest score. This is where our best local match ends.  
2. **Follow the Path Back:** From that highest-scoring box, we work backward, moving to the box that gave it its value (diagonal for a match, up for a gap, or left for a gap).  
3. **Stop at Zero:** We keep tracing back until we hit a box with a score of 0\. This 0 marks the beginning of our best local match.  
4. **Rebuild the Match:** As we trace back, we collect the letters from both sequences to reconstruct the highly similar segments.

## **Example Walkthrough**

**Our Sequences:**

* Seq1 \= "GA"  
* Seq2 \= "G"

**Our Scoring Rules:**

* Matching letters: Add 2 points  
* Mismatching letters: Subtract 1 point  
* Adding a gap: Subtract 1 point

### **Step 1: Set Up the Empty Grid**

Our grid will be (2+1)×(1+1)=3×2. We fill the first row and column with 0s.

|  | \- | G |
| :---- | :---- | :---- |
| \- | 0 | 0 |
| G | 0 |  |
| A | 0 |  |

*Highest score so far:* 0

### **Step 2: Fill the Grid Boxes**

Let's calculate each box's score:

* **Box at (G, G) (Cell** (1,1)**):**  
  * This compares G from Seq1 with G from Seq2. They match  
  * Score options:  
    * From diagonal (0) \+ Match (2) \= 2  
    * From above (0) \+ Gap (-1) \= −1  
    * From left (0) \+ Gap (-1) \= −1  
    * Reset to zero: 0  
  * H(1,1)=max(0,2,−1,−1)=2

|  | \- | G |
| :---- | :---- | :---- |
| \- | 0 | 0 |
| G | 0 | 2 |
| A | 0 |  |

*Highest score so far:* 2

* **Box at (A, G) (Cell** (2,1)**):**  
  * This compares A from Seq1 with G from Seq2. They mismatch  
  * Score options:  
    * From diagonal (0) \+ Mismatch (-1) \= −1  
    * From above (2) \+ Gap (-1) \= 1  
    * From left (0) \+ Gap (-1) \= −1  
    * Reset to zero: 0  
  * H(2,1)=max(0,−1,1,−1)=1

|  | \- | G |
| :---- | :---- | :---- |
| \- | 0 | 0 |
| G | 0 | 2 |
| A | 0 | 1 |

*Highest score so far:* 2 *(still the* 2 *from the previous box)*

### **Final Score Grid:**

|  | \- | G |
| :---- | :---- | :---- |
| \- | 0 | 0 |
| G | 0 | 2 |
| A | 0 | 1 |

The highest score in the grid is 2, found at the box for G in Seq1 and G in Seq2.

### **Step 3: Tracing Back (What's the Match?)**

* We start at the box with score 2 (Cell (1,1)).  
* It got its score from the diagonal 0 (Cell (0,0)) because G matched G.  
* Since we hit a 0, we stop

Our best local match is:  
G  
G

**With a score of 2\.**

This example shows how the Smith-Waterman algorithm builds the score grid to find the most similar local segments between two sequences.

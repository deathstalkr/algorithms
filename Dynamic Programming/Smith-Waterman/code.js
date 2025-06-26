// import visualization libraries {
const { Array2DTracer, Layout, LogTracer, Tracer, VerticalLayout } = require('algorithm-visualizer');
// }

// define tracer variables {
const array2dTracer = new Array2DTracer('Scoring Matrix'); // Renamed for clarity
const logTracer = new LogTracer('Logs'); // Renamed for clarity
// }

function smithWatermanLogic(seq1, seq2) {
    // Define scoring parameters
    const matchScore = 2;
    const mismatchScore = -1;
    const gapPenalty = -1;

    // Create a scoring matrix
    const lenSeq1 = seq1.length;
    const lenSeq2 = seq2.length;

    // Initialize a 2D array (matrix) with zeros
    const scoreMatrix = Array(lenSeq1 + 1).fill(0).map(() => Array(lenSeq2 + 1).fill(0));

    // Prepare the matrix for display
    const rowLabels = [''].concat(Array.from(seq1)); // e.g., ['', 'G', 'G', 'C', 'A', 'T']
    const colLabels = [''].concat(Array.from(seq2)); // e.g., ['', 'G', 'G', 'C', 'A']
    
    array2dTracer.set(scoreMatrix, rowLabels, colLabels); // Use array2dTracer here
    logTracer.print('Smith-Waterman Algorithm Visualization Started.'); // Use logTracer here
    Tracer.delay();

    let maxScore = 0; // Track the maximum score found

    // Fill the scoring matrix
    for (let i = 1; i <= lenSeq1; i++) {
        for (let j = 1; j <= lenSeq2; j++) {
            // Determine score for match/mismatch
            const score = (seq1[i - 1] === seq2[j - 1]) ? matchScore : mismatchScore;

            // Calculate scores from three possible paths: diagonal, up, left
            const diagonalScore = scoreMatrix[i - 1][j - 1] + score;
            const upScore = scoreMatrix[i - 1][j] + gapPenalty;
            const leftScore = scoreMatrix[i][j - 1] + gapPenalty;

            // The Smith-Waterman algorithm ensures scores never drop below zero
            // by taking the maximum of 0 and the calculated path scores.
            const currentCellScore = Math.max(0, diagonalScore, upScore, leftScore);

            // Update the score matrix cell
            scoreMatrix[i][j] = currentCellScore;

            // --- Visualization steps for the current cell ---

            // Highlight the current cell being processed
            array2dTracer.patch(i, j, currentCellScore);
            logTracer.print(`\n Processing cell [${i}, ${j}] (seq1: ${seq1[i-1] || '-'}, seq2: ${seq2[j-1] || '-'})`);
            Tracer.delay();

            // Briefly highlight the contributing cells for context
            array2dTracer.select(i - 1, j - 1); // Diagonal
            array2dTracer.select(i - 1, j);     // Up
            array2dTracer.select(i, j - 1);     // Left
            logTracer.print(`\n Scores from paths: Diagonal (${diagonalScore}), Up (${upScore}), Left (${leftScore})`);
            Tracer.delay();

            // Deselect the contributing cells
            array2dTracer.deselect(i - 1, j - 1);
            array2dTracer.deselect(i - 1, j);
            array2dTracer.deselect(i, j - 1);

            // Update the matrix tracer with the final value for the cell
            array2dTracer.depatch(i, j); // Remove patch after calculation
            array2dTracer.set(scoreMatrix, rowLabels, colLabels); // Re-render the matrix with updated value
            logTracer.print(`\n Cell [${i}, ${j}] updated to: ${currentCellScore}`);
            Tracer.delay();

            // Update the maximum score found so far
            if (currentCellScore > maxScore) {
                maxScore = currentCellScore;
                logTracer.print(`\n New maximum score found: ${maxScore} at [${i}, ${j}]`);
                Tracer.delay();
            }
        }
    }

    logTracer.print(`\n Algorithm finished. Final maximum score: ${maxScore}`);
    Tracer.delay();

    return maxScore;
}


(function main() {
    // visualize {
    Layout.setRoot(new VerticalLayout([array2dTracer, logTracer]));
    // }

    // Define input sequences
    const seq1 = "GGCAT";
    const seq2 = "GGCA";

    // Call the Smith-Waterman logic
    smithWatermanLogic(seq1, seq2);
})();

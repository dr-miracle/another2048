// eslint-disable-next-line no-unused-vars
class GameLogic {
    #min = 2;

    #max = 2048;

    #fieldSize = 4;

    #maxFieldSize = this.#fieldSize * this.#fieldSize;

    #gameField;

    #score = 0;

    #maxBlock = 2;

    // eslint-disable-next-line class-methods-use-this
    #transpose(array) {
      const [cols] = array;
      return Object.keys(cols)
        .map((colNumber) => array.map((rowNumber) => rowNumber[colNumber]));
    }

    #getEmptyIndexes() {
      return this.#gameField.reduce((res, v, i) => {
        if (v === 0) {
          res.push(i);
        }
        return res;
      }, []);
    }

    // eslint-disable-next-line class-methods-use-this
    #isMatrixEquals(oldArr, newArr) {
      const [row] = oldArr;
      const isEqual = Object.keys(row)
        .every((rowIndex) => {
          const oldRow = oldArr[rowIndex];
          const newRow = newArr[rowIndex];
          return oldRow.every((v, i) => v === newRow[i]);
        });
      return isEqual;
    }

    #getMatrix(arr, requiredTranspose) {
      const field = [...arr];
      const matrix = [...Array(this.#fieldSize).keys()]
        .reduce((r, rowIndex) => {
          const start = rowIndex * this.#fieldSize;
          const end = start + this.#fieldSize;
          const row = field.slice(start, end);
          r.push(row);
          return r;
        }, []);
      return requiredTranspose ? this.#transpose(matrix) : matrix;
    }

    #calculate(direction) {
      let score = 0;
      const requiredTranspose = direction === 'up' || direction === 'down';
      const leadingZeroes = direction === 'right' || direction === 'down';

      const matrix = this.#getMatrix(this.#gameField, requiredTranspose);
      const merged = matrix
        .map((row) => {
          const filtered = row
            .filter((v) => v !== 0)
            .map((v, i, rowArr) => {
              const next = i + 1;
              if (next > rowArr.length) {
                return v;
              }
              const nextV = rowArr[next];
              if (nextV === v) {
                // eslint-disable-next-line no-param-reassign
                rowArr[next] = 0;
                const doubled = v * 2;
                score += doubled;
                if (doubled > this.#maxBlock) {
                  this.#maxBlock = doubled;
                }
                return doubled;
              }
              return v;
            })
            .filter((v) => v !== 0);
          const zeroes = Array(this.#fieldSize - filtered.length).fill(0);
          return leadingZeroes ? [...zeroes, ...filtered] : [...filtered, ...zeroes];
        });
        // произошло слияние блоков или блоки переместились в другом направлении
      const hasDifference = !this.#isMatrixEquals(matrix, merged);
      if (hasDifference) {
        const final = (requiredTranspose ? this.#transpose(merged) : merged);
        const concated = final
          .reduce((arr, v) => arr.concat(v), []);
        this.#gameField = concated;
        this.#score += score;
      }
      return hasDifference;
    }

    constructor(field) {
      if (!field) {
        this.reset();
      } else {
        this.#gameField = field;
      }
    }

    reset() {
      this.#gameField = new Array(this.#maxFieldSize).fill(0);
      this.#score = 0;
      this.#maxBlock = 2;
    }

    max() {
      return this.#max;
    }

    currentMaxBlock() {
      return this.#maxBlock;
    }

    hasAnotherTurn() {
      const emptyBlocksIndexes = this.#getEmptyIndexes();
      const hasEmptyIndexes = emptyBlocksIndexes.length > 0;
      // очевидно что можно двинуться в любом направлении
      if (hasEmptyIndexes) {
        return true;
      }
      let canMove = false;
      const directions = ['up', 'right', 'down', 'left'];
      // eslint-disable-next-line no-restricted-syntax
      for (const direction of directions) {
        const requiredTranspose = direction === 'up' || direction === 'down';
        if (canMove) {
          break;
        }
        const matrix = this.#getMatrix(this.#gameField, requiredTranspose);
        // eslint-disable-next-line no-restricted-syntax
        for (const row of matrix) {
          if (canMove) {
            break;
          }
          const filtered = row
            .filter((v) => v !== 0);
          if (filtered.length < 2) {
            // eslint-disable-next-line no-continue
            continue;
          }
          for (let i = 0; i < filtered.length; i += 1) {
            const next = i + 1;
            if (next > filtered.length) {
              break;
            }
            const v = filtered[i];
            const nextV = filtered[next];
            if (nextV === v || nextV === 0) {
              canMove = true;
              break;
            }
          }
        }
      }
      return canMove;
    }

    score() {
      return this.#score;
    }

    gameField() {
      return this.#gameField;
    }

    static up() {
      return this.#calculate('up');
    }

    static right() {
      return this.#calculate('right');
    }

    static down() {
      return this.#calculate('down');
    }

    static left() {
      return this.#calculate('left');
    }

    spawn() {
      const emptyBlocksIndexes = this.#getEmptyIndexes();
      const canSpawn = emptyBlocksIndexes.length !== 0;
      if (!canSpawn) {
        return false;
      }
      const randomIndex = Math.floor(Math.random() * emptyBlocksIndexes.length);
      const emptyIndex = emptyBlocksIndexes[randomIndex];
      const isFirstSpawn = emptyBlocksIndexes.length >= this.#maxFieldSize - 2;
      let value = (Math.floor(Math.random() * 100)) > 5 ? this.#min : (this.#min * 2);
      // первые блоки всегда должны быть двойкой
      if (isFirstSpawn) {
        value = this.#min;
      }
      this.#gameField[emptyIndex] = value;
      return true;
    }
}

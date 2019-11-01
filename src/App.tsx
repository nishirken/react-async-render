import React from 'react';
import logo from './logo.svg';
import './App.css';

const randomColorValue = () => Math.round(Math.random() * 255);
const randomRgb = () => `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`;

const getColors = (): string[] => {
  return new Array(10000).fill('').map(randomRgb);
}

interface State {
  colors: string[];
}

const Square: React.FC<{ color: string, index: number }> = ({ color, index }) => (
  <div style={{ backgroundColor: color }} className="square">{index}</div>
);

class App extends React.PureComponent<{}, State> {
  state: State = {
    colors: []
  };
  private colors: string[] = getColors();
  private currentChunk: number = 1;
  private readonly chunkSize: number = 3;

  componentDidMount() {
    this.setNext();
  }

  private setNext(): void {
    this.setState(
      prevState => ({ colors: prevState.colors.concat(this.nextChunk) }),
      () => this.scheduleNext()
    );
  }

  private scheduleNext(): void {
    if (this.currentChunk * this.chunkSize > this.colors.length) {
      return;
    }
    window.setTimeout(() => {
      this.currentChunk++;
      this.setNext();
    }, 500);
  }

  private get nextChunk(): string[] {
    const startPoint = this.chunkSize * this.currentChunk;
    return this.colors.slice(startPoint, startPoint + this.chunkSize);
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        {this.state.colors.map((color, index) => (
          <Square color={color} key={index} index={index} />
        ))}
      </div>
    );
  }
}

export default App;

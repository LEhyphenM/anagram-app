import React from 'react';
import './App.scss';


const reduceString = function (string) {
  return string.trim().split('').sort().join('');
}

const validate = function (val, word) {
  let first = reduceString(val);
  let second = reduceString(word);

  return first === second;
}

class Anagram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      word: props.word || "",
      letters: {},
      usedLetters: {},
    }
    
    this._beginEditing = this._beginEditing.bind(this)
    this._updateFromInput = this._updateFromInput.bind(this)
    this._endEditing = this._endEditing.bind(this)
  }

  _mapLetters(string) {
    let obj = {}
    string.split('').map(letter => {
      let i = letter.toUpperCase()
      if(obj[i] >= 1) {
        obj[i]++
      } else {
        obj[i] = 1
      }
    })

    return obj
  }

  componentWillMount() {
    const letters = this._mapLetters(this.props.word)
    const usedLetters = this._mapLetters(this.props.compareTo)
    
    this.setState({
      letters: letters,
      usedLetters: usedLetters,
    })
  }
  
  componentWillUpdate() {
    const usedLetters = this._mapLetters(this.props.compareTo)
    
    this.setState({
      usedLetters: usedLetters,
    })
  }
  
  _beginEditing() {
    this.setState({
      isEditing: true
    })
  }
  
  _updateFromInput(e) {
    this.setState({
      word: e.target.value
    })

    console.log(this.state);
  } 
  
  _endEditing(e) {
    this.setState({
      word: e.target.value,
      isEditing: false
    })
    
    this.props.onWordChanged(e.target.value)
  }
    
  render() {
    const check = this.state.usedLetters,
          word = this.props.word.split(''),
          outputLetters = []
    
    word.map((l, i) => {
      let letter = l.toUpperCase()
      outputLetters[i] = {
        letter: letter,
        used: false
      }
      
      if(check[letter] > 0) {
        check[letter]--
        outputLetters[i].used = true
      }
    })

    const output = (
      <div className="originalText textCenter" 
        onClick={this._beginEditing}>
          {outputLetters.map(item => (
          <span className={item.used ? 'usedLetters' : 'letters'}>
            {item.letter}
          </span>
          ))}
      </div>
    )
    
    const input = (
      <div className="wordInput textCenter">
        <Input
          onChange={this._updateFromInput}
          onBlur={this._endEditing}
          autoFocus={this.state.isEditing}
          value={this.props.word}
        />
      </div>
    )

    return (
      <div className="container"> 
        {this.state.isEditing ? input : output} 
      </div>
    ) 
  }
} 

Anagram.defaultProps = { 
  compareTo: "/"
} 

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      value: props.value,
    }

    this._handleChange = this._handleChange.bind(this)
  }
  
  _handleChange(e) {
    this.setState({
      value: e.target.value,
    })

    this.props.onChange(e)
  }

  render() {
    return (
      <div>
        <input
          autoFocus={this.props.autoFocus}
          className={"container updatedText textCenter"}
          onChange={this._handleChange}
          onBlur={this.props.onBlur}
          value={this.state.value} 
        />
        </div>
      )
    }
  }

  class AnagramContainer extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props);
    this.state = {
      val: props.anagram || "",
      word: props.word,
    }

    this._onInputChange = this._onInputChange.bind(this)
    this._onWordChange = this._onWordChange.bind(this)
    
    console.log(validate(this.state.val, this.state.word));
  }
  
  _onInputChange(e) {
    console.log(name, 'updated:', e.target.value);
      this.setState({
        val: e.target.value,
      })

      console.log(this.state);
      console.log(validate(this.state.val, this.state.word));
  }

  _onWordChange(newWord) {
    this.setState({
      word: newWord,
    })
  }
    
    render() {
      return (
        <div>
          <div className="header padded">
            <h3>Anagrams</h3>
          </div>
          <div className="main-content validate col-6">
            <Anagram 
              word={this.state.word}
              allowExtraneousLetters={false}
              onExtraneousLetters={null} 
              compareTo={this.state.val}
              onWordChanged={this._onWordChange} //
            />
            <Input
              onChange={this._onInputChange}
              autoFocus={true}
              value={this.props.anagram} //
            />
            {this.setState.validate ? true : false && 
              <div className="valid col-1">Valid Anagram <span>✓</span></div>
            }
          </div>
        </div> 
      )
    }
}


export default AnagramContainer;



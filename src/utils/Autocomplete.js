import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { AutocompleteContainer,ListWithoutStyle,InputAutocomplete ,SpanAutocomplete,ItemList} from "./AutocompleteStyles";

export class Autocomplete extends React.Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      selectedElement:null
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
      
    const userInput = e.currentTarget.value;
    let suggestions = {};
    let filteredSuggestions = {};
    if(userInput){
        fetch("https://geocode.search.hereapi.com/v1/geocode?q="+userInput.toLowerCase()+"&apiKey=-5_JlpUxRxxJW-pE4YPyEmehgzTyN4hUdsXUfhp3QJU")
        .then(res => res.json())
        .then(
        (result) => {
            suggestions = result.items;
            // Filter our suggestions that don't contain the user's input
            filteredSuggestions = suggestions;
            /*.filter(
                suggestion =>
                suggestion.title.toLowerCase().includes(userInput.toLowerCase()) 
            );*/
        // Update the user input and filtered suggestions, reset the active
            // suggestion and make sure the suggestions are shown
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions,
                showSuggestions: true,
                userInput: userInput
            });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        );
    }
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    const {activeSuggestion,filteredSuggestions } = this.state;
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      selectedElement: filteredSuggestions[activeSuggestion]
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].title,
        selectedElement: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
            <ListWithoutStyle className="suggestions">
          
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
               <ItemList
                  className={className}
                  key={suggestion.title}
                  onClick={onClick}
                >
                  {suggestion.title}
                </ItemList>
              );
            })}
            </ListWithoutStyle>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No results</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
      <AutocompleteContainer>
            <SpanAutocomplete className="fa fa-search" ></SpanAutocomplete>
            <InputAutocomplete
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            className={this.props.className}
            id={this.props.id}
            ></InputAutocomplete>
            {suggestionsListComponent}
        </AutocompleteContainer>
      </Fragment>
    );
  }
}

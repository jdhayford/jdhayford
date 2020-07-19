import React from 'react';
import styled from 'styled-components';
import ChordsDB from '@tombatossals/chords-db/src/db/guitar';
import ReactChord from '@tombatossals/react-chords/lib/Chord';
import TetherComponent from 'react-tether';

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const BackButton = styled.div`
  display: flex;
  flex: 1;
  padding: 0.5rem 1rem;
  width: 4rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #777777;
  border-right-width: 0;
  cursor: pointer;
  :hover {
    background-color: #333333;
  }

  i {
    margin-right: 0.4rem;
  }
`

const SelectionWrapper = styled.div`
  display: flex;
  flex: 5;
`

const Section = styled.div`
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-left: 1px solid #777777;
  // border-right: 1px solid #777777;
`;

const NoteSection = styled(Section)`
`

const ModeSection = styled(Section)`

  ${(props) => props.disabled && `
    background-color: #111111;
  `}
`

const Content = styled.div`
  flex: 2;
`;

const Label = styled.div`
  flex: 1;
  font-size: 0.85rem;
  color: #777777;
`;

export const Navbar = (props) => {
  const { showBack = false, onBack = () => {}, note = null, mode = null } = props

  return (
    <NavbarWrapper>
      {showBack && (
        <BackButton onClick={() => onBack()}>
          <i className="fa fa-arrow-left"></i>
          Back
        </BackButton>
      )}
      <SelectionWrapper>
        {note && (
          <React.Fragment>
            <NoteSection>
              <Label>Key</Label>
              <Content>{note}</Content>
            </NoteSection>
            <ModeSection disabled={!mode}>
              {mode && (
                <React.Fragment>
                  <Label>Mode</Label>
                  <Content>{mode}</Content>
                </React.Fragment>
              )}
            </ModeSection>
          </React.Fragment>
        )}
      </SelectionWrapper>
    </NavbarWrapper>
  )
}
# Persisting State w/ DB

User -(has many)-> Page

Page -(has_many)-> Chord
Page -(has_many)-> Progression
Progression -(has_many)-> Chord

(Could possibly make different models, PageChord, ProgressionChord)

user {

}

user_join_page
  {
    user_id
    page_id
  }

page
  {
    id
    name
    contents JSON < chord[], progression[] >
  }

chord
  {
    id
    key
    suffix
    variation
  }

progression
  {
    id
    key
    mode
    numerals
  }


page_chord
  {
    page_id
  }

progression_chord
  {
    progression_id
  }

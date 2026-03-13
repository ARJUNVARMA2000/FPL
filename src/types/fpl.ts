// FPL API TypeScript Interfaces
// Based on https://fantasy.premierleague.com/api/bootstrap-static/

export interface Player {
  id: number;
  first_name: string;
  second_name: string;
  web_name: string;
  team: number;
  team_code: number;
  element_type: number; // 1=GKP, 2=DEF, 3=MID, 4=FWD
  status: string; // a=available, d=doubtful, i=injured, s=suspended, u=unavailable
  now_cost: number; // divide by 10 for display
  cost_change_start: number;
  cost_change_event: number;
  total_points: number;
  event_points: number;
  points_per_game: string;
  form: string;
  value_form: string;
  value_season: string;
  selected_by_percent: string;
  transfers_in_event: number;
  transfers_out_event: number;
  transfers_in: number;
  transfers_out: number;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  starts: number;
  expected_goals: string;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals_conceded: string;
  chance_of_playing_this_round: number | null;
  chance_of_playing_next_round: number | null;
  news: string;
  news_added: string | null;
  photo: string;
  code: number;
  in_dreamteam: boolean;
  dreamteam_count: number;
}

export interface Team {
  id: number;
  name: string;
  short_name: string;
  code: number;
  strength: number;
  strength_overall_home: number;
  strength_overall_away: number;
  strength_attack_home: number;
  strength_attack_away: number;
  strength_defence_home: number;
  strength_defence_away: number;
  played: number;
  win: number;
  draw: number;
  loss: number;
  points: number;
  position: number;
  pulse_id: number;
}

export interface Gameweek {
  id: number;
  name: string;
  deadline_time: string;
  average_entry_score: number;
  finished: boolean;
  data_checked: boolean;
  highest_scoring_entry: number | null;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  highest_score: number | null;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
  most_selected: number | null;
  most_transferred_in: number | null;
  top_element: number | null;
  top_element_info: {
    id: number;
    points: number;
  } | null;
  transfers_made: number;
  most_captained: number | null;
  most_vice_captained: number | null;
  chip_plays: {
    chip_name: string;
    num_played: number;
  }[];
}

export interface ElementType {
  id: number;
  plural_name: string;
  plural_name_short: string;
  singular_name: string;
  singular_name_short: string;
  squad_select: number;
  squad_min_play: number;
  squad_max_play: number;
  element_count: number;
}

export interface BootstrapResponse {
  elements: Player[];
  teams: Team[];
  events: Gameweek[];
  element_types: ElementType[];
  total_players: number;
}

export interface Fixture {
  id: number;
  code: number;
  event: number | null; // gameweek number, null if unscheduled
  finished: boolean;
  finished_provisional: boolean;
  kickoff_time: string | null;
  minutes: number;
  provisional_start_time: boolean;
  started: boolean;
  team_a: number;
  team_a_score: number | null;
  team_h: number;
  team_h_score: number | null;
  team_h_difficulty: number;
  team_a_difficulty: number;
  pulse_id: number;
  stats: FixtureStat[];
}

export interface FixtureStat {
  identifier: string;
  a: { value: number; element: number }[];
  h: { value: number; element: number }[];
}

export interface PlayerHistory {
  element: number;
  fixture: number;
  opponent_team: number;
  total_points: number;
  was_home: boolean;
  kickoff_time: string;
  team_h_score: number;
  team_a_score: number;
  round: number;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  starts: number;
  expected_goals: string;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals_conceded: string;
  value: number;
  transfers_balance: number;
  selected: number;
  transfers_in: number;
  transfers_out: number;
}

export interface PlayerFixture {
  id: number;
  code: number;
  team_h: number;
  team_h_score: number | null;
  team_a: number;
  team_a_score: number | null;
  event: number;
  finished: boolean;
  minutes: number;
  provisional_start_time: boolean;
  kickoff_time: string;
  event_name: string;
  is_home: boolean;
  difficulty: number;
}

export interface PlayerDetailResponse {
  history: PlayerHistory[];
  fixtures: PlayerFixture[];
  history_past: {
    season_name: string;
    element_code: number;
    start_cost: number;
    end_cost: number;
    total_points: number;
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string;
    creativity: string;
    threat: string;
    ict_index: string;
    starts: number;
    expected_goals: string;
    expected_assists: string;
    expected_goal_involvements: string;
    expected_goals_conceded: string;
  }[];
}

export interface LivePlayerStats {
  id: number;
  stats: {
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string;
    creativity: string;
    threat: string;
    ict_index: string;
    starts: number;
    expected_goals: string;
    expected_assists: string;
    expected_goal_involvements: string;
    expected_goals_conceded: string;
    total_points: number;
    in_dreamteam: boolean;
  };
  explain: {
    fixture: number;
    stats: {
      identifier: string;
      points: number;
      value: number;
    }[];
  }[];
}

export interface LiveResponse {
  elements: LivePlayerStats[];
}

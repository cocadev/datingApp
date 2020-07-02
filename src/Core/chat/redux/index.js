const SET_CHANNELS = 'SET_CHANNELS';
const SET_CHANNELS_PARTICIPATIONS = 'SET_CHANNELS_PARTICIPATIONS';
const SET_CHANNELS_SUBCRIBED = 'SET_CHANNELS_SUBCRIBED';

export const setChannels = data => ({
  type: SET_CHANNELS,
  data,
});

export const setChannelParticipations = data => ({
  type: SET_CHANNELS_PARTICIPATIONS,
  data,
});

export const setChannelsSubcribed = data => ({
  type: SET_CHANNELS_SUBCRIBED,
  data,
});

const initialState = {
  channels: [],
  areChannelsSubcribed: false,
  channelParticipations: [],
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS_SUBCRIBED:
      return {
        ...state,
        areChannelsSubcribed: action.data,
      };
    case SET_CHANNELS:
      return {
        ...state,
        channels: [...action.data],
      };
    case SET_CHANNELS_PARTICIPATIONS:
      return {
        ...state,
        channelParticipations: [...action.data],
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};

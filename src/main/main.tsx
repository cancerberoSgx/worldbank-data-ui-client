import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'emotion-theming';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { ThemeColors } from '../store/layout';
import * as themes from '../styles/theme';
import { styled } from '../styles/theme';
import { ThemeGlobals } from '../styles/themeGlobals';
import Routes from './routes';

interface PropsFromState {
  theme: ThemeColors
}

interface PropsFromDispatch {
  [key: string]: any

}

interface OwnProps {
  history: History
}

type AllProps = PropsFromState & PropsFromDispatch & OwnProps

class MainComponent extends React.Component<AllProps> {
  public render() {
    const { history, theme } = this.props

    return (
      <ConnectedRouter history={history}>
        <ThemeProvider theme={themes[theme]}>
          <Root>
            <ThemeGlobals />
            <Routes />
          </Root>
        </ThemeProvider>
      </ConnectedRouter>
    )
  }
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
`;

const mapStateToProps = ({ layout }: ApplicationState) => ({
  theme: layout.theme
})

export const Main =  connect<PropsFromState, PropsFromDispatch, OwnProps, ApplicationState>(
  mapStateToProps
)(MainComponent)


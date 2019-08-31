import * as React from 'react';

import DefaultNode from '../../../src/components/DefaultNode';
import { css } from 'glamor';
import { getSettings } from '../../dag-settings';
import { theme } from '../../styles';

export const endPointStyles = css({
  '&.right': {
    left: '190px',
  },
  borderRadius: '100%',
  height: '25px',
  left: '-12px',
  position: 'absolute',
  top: '25px',
  width: '25px',
});
export const nodeWrapperStyles = css({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
});
export const nodeStyles = css({
  background: 'white',
  border: `2px solid ${theme.main.colors.blueGreen}`,
  cursor: 'pointer',
  display: 'inline-block',
  height: '100px',
  position: 'absolute',
  width: '200px',
  
});

const closeButton = css({
  position: 'absolute',
  top: '-12px',
  right: '-13px',
  backgroundColor: '#ccc',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  padding: '2px',
  textAlign: 'center',
  zInedx: 1
});

export default class NodeType1 extends DefaultNode {
  private rightEndpointRef: HTMLElement | null;

  public componentDidMount() {
    const { transformSource } = getSettings() as any;
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...transformSource,
            isSource: true,
            uuid: `${this.props.id}-transform`,
            cssClass: `${this.props.id}-transform`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: {
        allowLoopback: false,
        // anchor: 'ContinuousLeft',
        anchor:[
          [ 0.5, 0, 0, -1, 0, 0, "top" ],
          [ 1, 0.5, 1, 0, 0, 0, "right" ],
          [ 0.5, 1, 0, 1, 0, 0, "bottom" ],
          [ 0, 0.5, -1, 0, 0, 0, "left" ]
        ],
        dropOptions: { hoverClass: 'drag-hover' },
        isTarget: true,
      },
      nodeId: this.props.id,
    };
    this.props.initNode(initConfig);
  }
  
  private doubleClick() {
    alert('')
  }

  private delete() {

  }

  public render() {
    return (
      <div id={this.props.id} className={`${nodeStyles}`} style={this.props.config.style} onDoubleClick={this.doubleClick}>
        <div className={`${nodeWrapperStyles}`}>
          <span className={`${closeButton}`} data-cy="close-button" onClick={this.delete}>
            X
          </span>
          {this.props.config.label ? this.props.config.label : this.props.id}
          <div
            id={`${this.props.id}-right`}
            ref={(ref) => (this.rightEndpointRef = ref)}
            className={`${endPointStyles} right`}
          />
        </div>
      </div>
    );
  }
}

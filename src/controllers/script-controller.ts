import { STATES_OFF } from 'custom-card-helpers';
import { Controller } from './controller';

export class ScriptController extends Controller {
  _min = 0;
  _max = 1;
  _targetValue;
  _invert = false;
  _clickPosition;
  _clickPositionLock;
  _originalValue;
  _originalValueLock;

  get _value(): number {
    return !STATES_OFF.includes(this.stateObj.state)
      ? 1
      : 0;
  }

  set _value(value) {
    const service = value > 0 ? 'turn_on' : 'turn_off';
    this._hass.callService('script', service, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      entity_id: this.stateObj.entity_id
    });
  }

  get _step(): number {
    return 1;
  }

  get label(): string {
    if (this.percentage > 0) {
      return this._hass.localize('component.script.state._.on');
    }
    return this._hass.localize('component.script.state._.off');
  }

}

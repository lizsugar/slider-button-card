import { Controller } from './controller';
import { normalize, percentageToValue, toPercentage } from '../utils';
import { SliderConfig } from '../types';
import { round } from '../utils';
import { stepToPrecision } from '../utils';

export class InputNumberController extends Controller {
  _targetValue;
  _invert = false;
  _clickPosition;
  _clickPositionLock;
  _originalValue;
  _originalValueLock;

  get _value(): number {
    return this.stateObj.state;
  }

  set _value(value) {
    this._hass.callService('input_number', 'set_value', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      entity_id: this.stateObj.entity_id,
      value: value,
    });
  }

  get _min(): number {
    return this.stateObj.attributes.min;
  }

  get _max(): number {
    return this.stateObj.attributes.max;
  }

  get isValuePercentage(): boolean {
    return false;
  }

  get _step(): number {
    return this.stateObj.attributes.step;
  }

  get label(): string {
    return this.stateObj.attributes.unit_of_measurement ?
		   `${round(this.targetValue,stepToPrecision(this.step))} ${this.stateObj.attributes.unit_of_measurement}` : `
	        ${round(this.targetValue,stepToPrecision(this.step))}`;
  }

}

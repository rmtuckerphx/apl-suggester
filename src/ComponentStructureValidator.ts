/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

'use strict';

import { IValidator } from './validation/IValidator';
import { IValidationInfo } from './validation/index.js';
import { ValidationSeed } from './validation/ValidationSeed';
import { ImageComponentValidator } from './validation/validators/ImageComponentValidator';
import { FrameComponentValidator } from './validation/validators/FrameComponentValidator';
import { ScrollViewComponentValidator } from './validation/validators/ScrollViewComponentValidator';
import { TextComponentValidator } from './validation/validators/TextComponetValidator';
import { VideoComponentValidator } from './validation/validators/VideoComponentValidator';
import { SequenceComponentValidator } from './validation/validators/SequenceComponentValidator';
import { ComponentValidator } from './validation/validators/ComponentValidator';
import { ContainerComponentValidator } from './validation/validators/ContainerComponentValidator';
/**
 * Entrance to validate component structure.
 * @export
 * @class Validator
 */
export class ComponentStructureValidator {
    /**
     * Singleton.
     */
    private static instance : ComponentStructureValidator;

    /**
     * All validators.
     */
    private validators : IValidator[];

    /**
     * Constructor
     */
    private constructor() {
        this.validators = [];
        this.validators.push(new ComponentValidator());
        this.validators.push(new ContainerComponentValidator());
        this.validators.push(new FrameComponentValidator());
        this.validators.push(new ImageComponentValidator());
        this.validators.push(new ScrollViewComponentValidator());
        this.validators.push(new SequenceComponentValidator());
        this.validators.push(new TextComponentValidator());
        this.validators.push(new VideoComponentValidator());
    }

    /**
     * Singleton method.
     */
    public static getInstance() : ComponentStructureValidator {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ComponentStructureValidator();
        return this.instance;
    }

    /**
     * Validate seed component.
     * @param validationSeed seed for validation.
     */
    public validate(validationSeed : ValidationSeed) : IValidationInfo[] {
        return this.validators
        .map((singleValidator) => singleValidator.validate(validationSeed))
        .reduce((result, nextItem) => result.concat(nextItem), []);
    }
}

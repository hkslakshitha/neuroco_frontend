import { TestBed } from '@angular/core/testing';

import { QuestionDataEntryOptionAnswerService } from './question-data-entry-option-answer.service';

describe('QuestionDataEntryOptionAnswerService', () => {
  let service: QuestionDataEntryOptionAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionDataEntryOptionAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { http, HttpResponse } from 'msw';
import { server } from './server/mockServer';
import { render, screen } from '@testing-library/react';
import { FetchExample } from './FetchExample';

describe('FetchExample', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('api 응답에 있는 메뉴 목록 타이틀이 화면에 보여야 한다.', async () => {
    render(<FetchExample />);

    expect(await screen.findByText('토핑')).toBeInTheDocument();
  });

  it('api 응답값 중 메뉴목록 타이틀이 "맛있는 토핑"이면, "맛있는 토핑"이 화면에 보여야 한다.', async () => {
    server.use(
      http.get('/api/store/:storeId', () => {
        return HttpResponse.json({
          storeMenu: [
            {
              id: 'id',
              title: '맛있는 토핑',
            },
          ],
        });
      }),
    );

    render(<FetchExample />);

    expect(await screen.findByText('맛있는 토핑')).toBeInTheDocument();
  });

  it.each`
    hour    | minute  | expected
    ${'09'} | ${'59'} | ${'영업종료'}
    ${'10'} | ${'00'} | ${'영업중'}
    ${'10'} | ${'01'} | ${'영업중'}
    ${'21'} | ${'59'} | ${'영업중'}
    ${'22'} | ${'00'} | ${'영업종료'}
    ${'22'} | ${'01'} | ${'영업종료'}
  `(
    '영업시간이 10~22시고, 현재 시간이 $hour시 $minute분이라면, $expected이/가 화면에 보여야 한다.',
    async ({ hour, minute, expected }: { hour: string; minute: string; expected: string }) => {
      server.use(
        http.get('/api/store/:storeId', () => {
          return HttpResponse.json({
            openHour: 10,
            closeHour: 22,
            storeMenu: [],
          });
        }),
      );

      const now = new Date(`2023-01-01T${hour}:${minute}:00`).getTime();
      jest.spyOn(global.Date, 'now').mockImplementation(() => now);

      render(<FetchExample />);

      expect(await screen.findByText(expected)).toBeInTheDocument();
    },
  );
});

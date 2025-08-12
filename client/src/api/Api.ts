/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BookingDto {
  /**
   * The ID of the booking
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * The ID of the court being booked
   * @example 1
   */
  courtId: number;
  /**
   * The ID of the park being booked
   * @example 1
   */
  parkId: number;
  /**
   * The time the booking was confirmed
   * @example "2024-01-01T11:00:00.000Z"
   */
  timeConfirmed?: string;
  /**
   * The start time of the booking
   * @example "2024-01-01T11:00:00.000Z"
   */
  start: string;
  /**
   * The end time of the booking
   * @example "2024-01-01T12:00:00.000Z"
   */
  end: string;
  /**
   * The duration of the booking in minutes
   * @example "60"
   */
  duration: 30 | 60 | 90 | 120;
  /** The status of the booking */
  status: 1 | 2 | 3;
  /**
   * The ID of the user who made the booking
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  userId: string;
  /** The timezone of the park */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
}

export interface BookingDurationDisplayDto {
  /**
   * The duration of the slot.
   * @example "30"
   */
  minutes: 30 | 60 | 90 | 120;
  /**
   * The display string for the duration.
   * @example "30 minutes"
   */
  display: string;
}

export interface CourtDto {
  /**
   * The court number within a park.
   * @example 1
   */
  courtNumber: number;
  /**
   * The timezone for the park.
   * @example "America/New_York"
   */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
  /**
   * Tennis or Pickleball.
   * @example "Tennis"
   */
  type: 1 | 2;
  /**
   * How the court is configured with respect to Tennis and Pickleball.
   * @example "Tennis"
   */
  configuration: 1 | 2 | 3 | 4;
  /**
   * Unique identifier for composite courts, meaning a single Tennis Court with multiple uses or multiple Pickleball courts on a single Tennis court.
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  compositeId?: string;
  /**
   * The ID of the court
   * @example 1
   */
  id: number;
}

export interface ParkAvailabilitySlot {
  /**
   * The start time of the slot.
   * @example "2024-01-01T00:00:00.000Z"
   */
  start: string;
  /**
   * The end time of the slot.
   * @example "2024-01-01T00:00:00.000Z"
   */
  end: string;
  /**
   * The duration of the slot.
   * @example "30"
   */
  duration: BookingDurationDisplayDto;
  /**
   * The list of courts available for the slot.
   * @example []
   */
  courts: CourtDto[];
}

export interface ParkAvailabilityDto {
  /**
   * The ID of the park to get availability for.
   * @example 1
   */
  parkId: number;
  /**
   * The timezone for the park.
   * @example "America/New_York"
   */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
  /**
   * The list of Slots available for the park on a given date.
   * @example []
   */
  slots: ParkAvailabilitySlot[];
}

export interface RequestBookingDto {
  /**
   * The ID of the park being booked
   * @example 1
   */
  parkId: number;
  /**
   * The ID of the court being booked
   * @example 1
   */
  courtId: number;
  /**
   * The timezone of the court being booked
   * @example "America/New_York"
   */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
  /**
   * The email of the user booking the court
   * @example "test@test.com"
   */
  email: string;
  /**
   * The start time of the booking
   * @example "2024-01-01T11:00:00.000Z"
   */
  start: string;
  /**
   * The end time of the booking
   * @example "2024-01-01T12:00:00.000Z"
   */
  end: string;
  /**
   * The duration of the booking in minutes
   * @example "30, 60, 90, 120"
   */
  duration: 30 | 60 | 90 | 120;
}

export interface ModifyBookingDto {
  /**
   * The ID of the booking to confirm
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  bookingId: string;
  /**
   * The email of the user confirming the booking
   * @example "test@test.com"
   */
  email: string;
}

export interface BookingConfirmationDto {
  /**
   * The ID of the booking
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * The ID of the court being booked
   * @example 1
   */
  courtId: number;
  /**
   * The ID of the park being booked
   * @example 1
   */
  parkId: number;
  /**
   * The time the booking was confirmed
   * @example "2024-01-01T11:00:00.000Z"
   */
  timeConfirmed?: string;
  /**
   * The start time of the booking
   * @example "2024-01-01T11:00:00.000Z"
   */
  start: string;
  /**
   * The end time of the booking
   * @example "2024-01-01T12:00:00.000Z"
   */
  end: string;
  /**
   * The duration of the booking in minutes
   * @example "60"
   */
  duration: 30 | 60 | 90 | 120;
  /** The status of the booking */
  status: 1 | 2 | 3;
  /**
   * The ID of the user who made the booking
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  userId: string;
  /** The timezone of the park */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
  /**
   * The name of the park
   * @example "Central Park Tennis Courts"
   */
  parkName: string;
  /**
   * The full address of the park
   * @example "123 Main St, New York, NY 10001"
   */
  fullParkAddress: string;
  /**
   * The Number of the court being booked
   * @example 1
   */
  courtNumber: number;
  /**
   * The ID of the user who made the booking
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  userEmail: string;
}

export type Court = object;

export interface CreateCourtDto {
  /**
   * The court number within a park.
   * @example 1
   */
  courtNumber: number;
  /**
   * The timezone for the park.
   * @example "America/New_York"
   */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
  /**
   * Tennis or Pickleball.
   * @example "Tennis"
   */
  type: 1 | 2;
  /**
   * How the court is configured with respect to Tennis and Pickleball.
   * @example "Tennis"
   */
  configuration: 1 | 2 | 3 | 4;
  /**
   * Unique identifier for composite courts, meaning a single Tennis Court with multiple uses or multiple Pickleball courts on a single Tennis court.
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  compositeId?: string;
}

export interface ParkDto {
  /**
   * The name of the park.
   * @example "The Tennis Club"
   */
  name: string;
  /**
   * The address line for the park.
   * @example "123 Main St"
   */
  addressLine: string;
  /**
   * The city for the park.
   * @example "San Francisco"
   */
  city: string;
  /**
   * The state for the park (e.g. CA).
   * @example "CA"
   */
  state: string;
  /**
   * The zip code for the park.
   * @example "94103"
   */
  zip: string;
  /**
   * The timezone for the park.
   * @example "America/New_York"
   */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
  /**
   * Whether the park has lights.
   * @example true
   */
  lighted?: boolean;
  /**
   * Whether the park has bathrooms.
   * @example true
   */
  bathrooms?: boolean;
  /**
   * Whether the park is a tennis club.
   * @example true
   */
  tennisClub?: boolean;
  /**
   * Whether the park has a ball wall.
   * @example true
   */
  ballWall?: boolean;
  /**
   * Whether the park has a tennis store.
   * @example true
   */
  tennisStore?: boolean;
  /**
   * Whether the park has a fee.
   * @example true
   */
  fee?: boolean;
  /**
   * Whether the park is restricted.
   * @example true
   */
  restricted?: boolean;
  /**
   * The list of courts associated with the park.
   * @example []
   */
  courts?: CreateCourtDto[];
  /**
   * The ID of the park
   * @example 1
   */
  id: number;
}

export interface CreateParkDto {
  /**
   * The name of the park.
   * @example "The Tennis Club"
   */
  name: string;
  /**
   * The address line for the park.
   * @example "123 Main St"
   */
  addressLine: string;
  /**
   * The city for the park.
   * @example "San Francisco"
   */
  city: string;
  /**
   * The state for the park (e.g. CA).
   * @example "CA"
   */
  state: string;
  /**
   * The zip code for the park.
   * @example "94103"
   */
  zip: string;
  /**
   * The timezone for the park.
   * @example "America/New_York"
   */
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Los_Angeles'
    | 'America/Indiana/Indianapolis'
    | 'America/Indiana/Knox'
    | 'America/Indiana/Winamac'
    | 'America/Kentucky/Louisville'
    | 'America/Kentucky/Monticello'
    | 'America/Detroit'
    | 'America/North_Dakota/Center'
    | 'America/North_Dakota/New_Salem'
    | 'America/North_Dakota/Beulah';
  /**
   * Whether the park has lights.
   * @example true
   */
  lighted?: boolean;
  /**
   * Whether the park has bathrooms.
   * @example true
   */
  bathrooms?: boolean;
  /**
   * Whether the park is a tennis club.
   * @example true
   */
  tennisClub?: boolean;
  /**
   * Whether the park has a ball wall.
   * @example true
   */
  ballWall?: boolean;
  /**
   * Whether the park has a tennis store.
   * @example true
   */
  tennisStore?: boolean;
  /**
   * Whether the park has a fee.
   * @example true
   */
  fee?: boolean;
  /**
   * Whether the park is restricted.
   * @example true
   */
  restricted?: boolean;
  /**
   * The list of courts associated with the park.
   * @example []
   */
  courts?: CreateCourtDto[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal:
          (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) ||
          null,
        body:
          typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title GameSetBook API
 * @version 1.0
 * @contact
 *
 * API for Booking Tennis and Pickleball Courts
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Root
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  booking = {
    /**
     * No description
     *
     * @tags Bookings
     * @name BookingControllerGetBookingById
     * @request GET:/booking/{bookingId}
     */
    bookingControllerGetBookingById: (bookingId: string, params: RequestParams = {}) =>
      this.request<BookingDto, any>({
        path: `/booking/${bookingId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingControllerGetParkAvailabilityByDate
     * @request GET:/booking/availability/{parkId}/{date}/{duration}
     */
    bookingControllerGetParkAvailabilityByDate: (
      parkId: number,
      date: string,
      duration: 30 | 60 | 90 | 120,
      params: RequestParams = {}
    ) =>
      this.request<ParkAvailabilityDto, any>({
        path: `/booking/availability/${parkId}/${date}/${duration}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingControllerRequestBooking
     * @request POST:/booking/reserve
     */
    bookingControllerRequestBooking: (
      data: RequestBookingDto,
      params: RequestParams = {}
    ) =>
      this.request<BookingDto, any>({
        path: `/booking/reserve`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingControllerConfirmBooking
     * @request POST:/booking/confirm
     */
    bookingControllerConfirmBooking: (
      data: ModifyBookingDto,
      params: RequestParams = {}
    ) =>
      this.request<BookingConfirmationDto, any>({
        path: `/booking/confirm`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingControllerConfirmCancellation
     * @request POST:/booking/cancel
     */
    bookingControllerConfirmCancellation: (
      data: ModifyBookingDto,
      params: RequestParams = {}
    ) =>
      this.request<BookingConfirmationDto, any>({
        path: `/booking/cancel`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  court = {
    /**
     * No description
     *
     * @tags Courts
     * @name CourtControllerGetCourts
     * @request GET:/court
     */
    courtControllerGetCourts: (params: RequestParams = {}) =>
      this.request<Court[], any>({
        path: `/court`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  park = {
    /**
     * No description
     *
     * @tags Parks
     * @name ParkControllerGetAllParks
     * @request GET:/park
     */
    parkControllerGetAllParks: (params: RequestParams = {}) =>
      this.request<ParkDto[], any>({
        path: `/park`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Parks
     * @name ParkControllerCreatePark
     * @request POST:/park
     */
    parkControllerCreatePark: (data: CreateParkDto, params: RequestParams = {}) =>
      this.request<ParkDto, any>({
        path: `/park`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Parks
     * @name ParkControllerGetPark
     * @request GET:/park/{id}
     */
    parkControllerGetPark: (id: number, params: RequestParams = {}) =>
      this.request<ParkDto[], any>({
        path: `/park/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags Users
     * @name UserControllerGetAllUsers
     * @request GET:/user
     */
    userControllerGetAllUsers: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UserControllerGetUserById
     * @request GET:/user/{id}
     */
    userControllerGetUserById: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'GET',
        ...params,
      }),
  };
}

Feature: Ticket booking
    Scenario: One ticket
        Given this user is visited the page "/client/index.php"
        When the user is choose the day of the booking week "4"
        When the user is choose the show time and movie title "225"
        When the user has chose any free seat in the movie hall
        When the user is click on to the «Reservation» button
        Then sees the booking confirmation with the name of the movie "Ведьмак"
    Scenario: Two tickets
        Given this user is visited the page "/client/index.php"
        When the user is choose the day of the booking week "5"
        When the user is choose the show time and movie title "217"
        When the user has chose any free seat in the movie hall
        When the user has chose any free seat in the movie hall
        When the user is click on to the «Reservation» button
        Then sees the booking confirmation with the name of the movie "Сталкер(1979)"
    Scenario: Sad case
        Given this user visited the page "/client/index.php"
        When the user is choose the day of the booking week "5"
        When the user is choose the show time and movie title "199"
        When the user is choose a seat in the hall that is not available for booking
        When the user is try to click on to the «Reservation» button
        Then the user is understands that the «Reservation» button is inactive
def test_verify_token_with_valid_jwt(client, auth_headers):
    response = client.get("/profile/verify-token", headers=auth_headers)
    assert response.status_code == 200
    assert response.get_json() == {"success": "verified"}

def test_verify_token_without_jwt_fails(client):
    response = client.get("/profile/verify-token")
    assert response.status_code == 401
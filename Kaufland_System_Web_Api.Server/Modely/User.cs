namespace Kaufland_Software.Server.Modely
{
    public enum Opravnenie
    {
        VOD = 1,
        Manazment = 2,
        PPO = 3
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public Opravnenie Rola { get; set; } = Opravnenie.PPO;
    }
}